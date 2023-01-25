import RectangleGroupIcon from "../../Icons/components/RectangleGroupIcon";
import {
  useGetProjectsQuery,
  useUpdateProjectMutation,
} from "../features/projectsApiSlice";
import { IProjectCardProps } from "../interfaces/IProjectCard";
import moment from "moment";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { useGetTicketsQuery } from "../../Tickets/features/ticketsApiSlice";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import Switch from "../../FormFields/components/Switch";

const ProjectCard = ({ projectId }: IProjectCardProps) => {
  const { isAdmin } = useAuth();
  const { project } = useGetProjectsQuery("projectList", {
    selectFromResult: ({ data }) => ({
      project: data?.entities[projectId],
    }),
  });
  const { data: tickets } = useGetTicketsQuery("ticketList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  const [updateProject, { isSuccess, isError, error }] =
    useUpdateProjectMutation();

  const [hover, setHover] = useState(false);

  const navigate = useNavigate();

  const filteredTickets = tickets?.ids
    .map((ticketId) => {
      const ticket = tickets.entities[ticketId];

      return ticket;
    })
    .filter((ticket) => ticket?.project === project?._id);

  const getTogglePosition = useCallback(() => {
    if (project?.status === "open") {
      return "justify-start bg-dark-blue";
    }

    if (project?.status === "closed") {
      return "justify-end bg-light-green";
    }
  }, [project]);

  const onUpdateStatus = async () => {
    if (!isAdmin) return;

    await updateProject({
      id: project?._id,
      title: project?.title,
      description: project?.description,
      status: project?.status === "closed" ? "open" : "closed",
    });
  };

  useEffect(() => {
    if (!isSuccess) return;

    toast.success("Project has been updated");
  }, [isSuccess]);

  useEffect(() => {
    if (!isError || error === undefined) return;

    if ("data" in error) {
      toast.error(`${error.status} ${JSON.stringify(error.data)}`);
    }
  }, [isError, error]);

  return (
    <article
      className='border w-[260px] h-[240px] rounded-lg py-3 pl-5 pr-2 shadow-md text-header-main select-none overflow-hidden'
      style={{
        borderTopColor: project?.color,
        borderTopWidth: "4px",
      }}
    >
      <div className='flex'>
        <div
          style={{
            backgroundColor: project?.color,
          }}
          className='inline-flex p-1 rounded-lg'
        >
          <RectangleGroupIcon classNames='h-6 w-6 text-white' />
        </div>
        <div className='flex flex-col text-xs ml-2 truncate'>
          <span className='font-medium capitalize'>{project?.title}</span>
          <p className='truncate'>{project?.description}</p>
        </div>
      </div>

      <div className='border-b w-full mt-2' />

      <div className='mt-8'>
        <div className='text-xs text-gray-text flex flex-col items-start relative'>
          <AnimatePresence>
            {hover && !isAdmin ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className='absolute -top-4 bg-header-main text-white px-1 py-1 rounded-md z-40'
              >
                Only admins can perform this action
              </motion.div>
            ) : null}
          </AnimatePresence>
          <span className='font-semibold mb-1 mr-3 self-center'>STATUS</span>
          <div className='flex items-center space-x-2 self-center'>
            <span
              className={`${
                project?.status === "open" ? "text-dark-blue font-semibold" : ""
              }`}
            >
              Open
            </span>
            <div
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              <Switch
                isAdmin={isAdmin}
                project={project}
                handleChecked={onUpdateStatus}
                isOn={project?.status === "closed"}
                getTogglePosition={getTogglePosition}
              />
            </div>

            <span
              className={`${
                project?.status === "closed"
                  ? "text-light-green font-semibold"
                  : ""
              }`}
            >
              Closed
            </span>
          </div>
        </div>

        <div
          onClick={() => navigate("/dashboard")}
          className='mt-8 text-xs text-gray-text font-semibold cursor-pointer hover:bg-gray-100 transition-all duration-200 py-1'
        >
          <span>TICKETS: {filteredTickets?.length}</span>
        </div>
        <div className='text-xs text-gray-text'>
          <span className='font-semibold'>CREATED:</span>
          <p>{moment(project?.createdAt).format("MMMM Do YYYY, h:mm a")}</p>
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
