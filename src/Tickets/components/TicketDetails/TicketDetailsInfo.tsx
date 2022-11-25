import { ChangeEvent, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { convertString } from "../../../helpers/firstLetterUppercase";
import { ITicketDetailsInfoProps } from "./interfaces/ITicketDetails";
import SelectField from "../../../FormFields/components/SelectField";
import TicketDetailsAccordion from "./TicketDetailsAccordion";
import { useUpdateTicketMutation } from "../../features/ticketsApiSlice";
import TextAreaField from "../../../FormFields/components/TextAreaField";
import Button from "../../../Button/components/Button";
import { useGetWorkflowStatusQuery } from "../../../WorkflowStatus/features/workflowsApiSlice";
import useStyles from "../../../hooks/useStyles";
import { useGetProjectsQuery } from "../../../Projects/features/projectsApiSlice";

const TicketDetailsInfo = ({
  id,
  ticket,
  category,
}: ITicketDetailsInfoProps) => {
  const [updateTicket, { isLoading, isSuccess, isError, error }] =
    useUpdateTicketMutation();

  const { data: workflowStatus } =
    useGetWorkflowStatusQuery("workflowStatusList");
  const { data: projects } = useGetProjectsQuery("projectList");

  const { background } = useStyles(category!);

  const [editDescription, setEditDescription] = useState(false);
  const [editDescText, setEditDescText] = useState("");
  const [status, setStatus] = useState("");

  const descRef = useRef<HTMLTextAreaElement>(null);

  const currentTicketProject = projects?.ids
    .map((projectId) => {
      const singleStatus = projects.entities[projectId];

      return singleStatus;
    })
    .find((item) => item?.id === ticket?.project);

  const onEditEnable = () => {
    if (ticket?.user !== id) return;
    setEditDescription(true);

    if (ticket.description !== undefined) {
      const newDesc = convertString(ticket.description);
      setEditDescText(newDesc);
    }
  };

  const onEditCancel = () => {
    setEditDescription(false);
  };

  const onEditSubmit = async () => {
    await updateTicket({
      id: ticket?.id,
      title: ticket?.title,
      project: ticket?.project,
      status: ticket?.status,
      description: editDescText,
      assignee: ticket?.assignee,
    });

    setEditDescription(false);
  };

  const onStatusUpdate = async (e: ChangeEvent<HTMLSelectElement>) => {
    await updateTicket({
      id: ticket?.id,
      title: ticket?.title,
      project: ticket?.project,
      status: e.target.value,
      description: ticket?.description,
      assignee: ticket?.assignee,
    });
  };

  useEffect(() => {
    if (!editDescription || descRef.current === null) return;

    descRef?.current.focus();
  }, [editDescription, descRef]);

  useEffect(() => {
    if (ticket === undefined) return;

    setStatus(ticket.status);
  }, [ticket]);

  return (
    <div className='select-none'>
      <div className='px-3'>
        <div className='flex items-center justify-between'>
          <p className='text-xs text-gray-text'>Title</p>
        </div>
        <div className='mb-6'>
          <h4>{ticket?.title}</h4>
        </div>

        <div className='flex items-center justify-between'>
          <p className='text-xs text-gray-text'>Project</p>
        </div>

        <div className='flex items-center justify-between'>
          <h4 className='text-lg font-medium pr-2 capitalize'>
            {currentTicketProject?.title}
          </h4>
          <form
            className={`relative p-2 ${
              ticket?.user !== id
                ? ""
                : "hover:bg-gray-100 transition-all duration-200"
            } rounded-lg`}
          >
            <SelectField
              name='status'
              htmlFor='status'
              id='status'
              onChange={onStatusUpdate}
              disabled={ticket?.user !== id}
              value={status}
              items={workflowStatus?.ids}
              spanClassNames={`w-5 h-5 absolute right-2 top-2 z-50 pointer-events-none text-white`}
              selectClassNames={`pl-4 pr-7 py-2 rounded-lg cursor-pointer transition-all duration-200 font-semibold outline-none text-sm uppercase appearance-none relative ${background} ${
                ticket?.user !== id ? "pointer-events-none select-none" : ""
              }`}
              optionClassNames='bg-gray-100 text-header-main uppercase'
            />
          </form>
        </div>
      </div>

      <div className='flex flex-col justify-center mt-4 pl-1'>
        <p className='text-sm font-medium pl-2'>Description</p>

        <>
          {editDescription ? (
            <>
              <TextAreaField
                classNames='mt-1 bg-transparent outline-none hover:bg-gray-100 transition-all duration-200 px-3 py-2 rounded-md break-words  scrollbar-thin scrollbar-thumb-light-blue scrollbar-track-gray-300 overflow-y-scroll border'
                rows={6}
                value={editDescText}
                onChange={(e) => setEditDescText(e.target.value)}
                focus
                disabled={ticket?.user !== id}
              />
              <div className='flex space-x-2 mt-2'>
                <Button
                  classNames='bg-deep-blue text-white py-1 px-2 rounded-md hover:bg-light-blue transition-all duration-100 text-sm mt-0.5 inline-flex w-fit'
                  onClick={onEditSubmit}
                  text='Save'
                />

                <Button
                  onClick={onEditCancel}
                  classNames='hover:bg-gray-200 text-gray-text py-1 px-2 rounded-md transition-all duration-100 text-sm mt-0.5'
                  text='Cancel'
                />
              </div>
            </>
          ) : (
            <>
              <motion.p
                initial={{ display: "none" }}
                animate={{ display: "inline-flex" }}
                exit={{ display: "none" }}
                onClick={onEditEnable}
                className={`${
                  ticket?.user !== id ? "pointer-events-none select-none" : ""
                }  mt-1 bg-transparent outline-none hover:bg-gray-100 transition-all duration-200 px-3 py-2 rounded-md break-words`}
              >
                {ticket?.description !== undefined &&
                  convertString(ticket?.description)}
              </motion.p>
            </>
          )}
        </>
      </div>

      <TicketDetailsAccordion ticket={ticket} />
    </div>
  );
};

export default TicketDetailsInfo;
