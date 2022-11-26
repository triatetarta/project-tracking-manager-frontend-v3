import { ChangeEvent, useEffect, useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";
import { ITicketDetailsAccordionProps } from "./interfaces/ITicketDetails";
import { useGetUsersQuery } from "../../../Auth/features/usersApiSlice";
import moment from "moment";
import Avatar from "../../../Avatar/components/Avatar";
import SelectField from "../../../FormFields/components/SelectField";
import { useUpdateTicketMutation } from "../../features/ticketsApiSlice";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";

const TicketDetailsAccordion = ({ ticket }: ITicketDetailsAccordionProps) => {
  const { id } = useAuth();
  const { user, assignee, userIds } = useGetUsersQuery("userList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[ticket?.user!],
      assignee: data?.entities[ticket?.assignee!],
      userIds: data?.ids,
    }),
  });
  const [updateTicket, { isSuccess, isError, error }] =
    useUpdateTicketMutation();

  const [detailsOpen, setDetailsOpen] = useState(false);
  const [editAssignee, setEditAssignee] = useState(false);

  const onEditAssigneeEnable = () => {
    if (ticket?.user !== id) return;
    setEditAssignee(true);
  };

  const onAssigneeUpdate = async (e: ChangeEvent<HTMLSelectElement>) => {
    await updateTicket({
      id: ticket?.id,
      title: ticket?.title,
      project: ticket?.project,
      status: ticket?.status,
      description: ticket?.description,
      assignee: e.target.value,
    });

    setEditAssignee(false);
  };

  useEffect(() => {
    if (!isSuccess) return;

    toast.success("Ticket has been updated");
  }, [isSuccess]);

  useEffect(() => {
    if (!isError || error === undefined) return;

    if ("data" in error) {
      toast.error(`${error.status} ${JSON.stringify(error.data)}`);
    }
  }, [isError, error]);

  return (
    <>
      <div
        onClick={() => setDetailsOpen(!detailsOpen)}
        className={`mt-12 flex items-center justify-between cursor-pointer hover:bg-gray-100 transition-all duration-200 py-3 border ${
          detailsOpen ? "rounded-t-lg border-b-0" : "rounded-lg"
        }`}
      >
        <p className='text-sm font-medium pl-3'>Details</p>
        <div className='text-xs text-gray-text ml-1.5'>
          {!detailsOpen ? "Reporter, Date" : ""}
        </div>
        <div className='mr-3 ml-auto'>
          {!detailsOpen ? (
            <ChevronDownIcon className='w-5 h-5' />
          ) : (
            <ChevronUpIcon className='w-5 h-5' />
          )}
        </div>
      </div>

      {detailsOpen && (
        <div className='border rounded-b-lg pb-4'>
          <div className='flex flex-col justify-center mt-5'>
            <p className='text-xs text-gray-text pl-5'>Assignee</p>

            {!editAssignee ? (
              <div
                onClick={onEditAssigneeEnable}
                className={`inline-flex py-1 items-center pl-5 ${
                  ticket?.user !== id
                    ? ""
                    : "hover:bg-gray-100 transition-all duration-200"
                }`}
              >
                <Avatar
                  image={assignee?.image}
                  name={assignee?.name}
                  classNames='h-5 w-5 text-sm'
                />
                <p className='ml-1 text-xs'>{assignee?.name}</p>
              </div>
            ) : (
              <div className='flex justify-between items-center relative mt-1'>
                <div className='pl-5 flex flex-col'>
                  <SelectField
                    name='assignee'
                    htmlFor='assignee'
                    id='assignee'
                    onChange={onAssigneeUpdate}
                    value={ticket?.assignee}
                    disabled={ticket?.user !== id}
                    items={userIds}
                    spanClassNames='w-4 h-4 absolute right-2 top-3 z-50 pointer-events-none text-gray-text'
                    selectClassNames='py-2 pl-2 pr-6 border rounded-md mb-3 text-sm hover:bg-gray-100
                      transition-all duration-200 cursor-pointer focus:outline-1 outline-deep-blue capitalize appearance-none'
                  />
                </div>
                <div />
              </div>
            )}
          </div>
          <div className='flex flex-col justify-center mt-5'>
            <p className='text-xs text-gray-text pl-5'>Reporter</p>

            <div className='flex py-1 items-center pl-5'>
              <Avatar
                image={user?.image}
                name={user?.name}
                classNames='h-5 w-5 text-sm'
              />
              <p className='ml-1 text-xs'>{user?.name}</p>
            </div>
          </div>
          <div className='flex flex-col justify-center mt-5 pl-5'>
            <p className='text-xs text-gray-text'>Created</p>
            <p className='text-xs'>
              {moment(ticket?.createdAt).format("MMMM Do YYYY, h:mm a")}
            </p>
          </div>

          {ticket?.createdAt !== ticket?.updatedAt ? (
            <div className='flex flex-col justify-center mt-2 pl-5'>
              <p className='text-xs text-gray-text'>Updated</p>
              <p className='text-xs'>
                {moment(moment(ticket?.updatedAt).local().format()).fromNow()}
              </p>
            </div>
          ) : null}
        </div>
      )}
    </>
  );
};

export default TicketDetailsAccordion;
