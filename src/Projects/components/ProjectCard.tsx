import RectangleGroupIcon from "../../Icons/components/RectangleGroupIcon";
import {
  useGetProjectsQuery,
  useUpdateProjectMutation,
} from "../features/projectsApiSlice";
import { IProjectCardProps } from "../interfaces/IProjectCard";
import moment from "moment";
import { motion } from "framer-motion";
import { useCallback } from "react";

const ProjectCard = ({ projectId }: IProjectCardProps) => {
  const { project } = useGetProjectsQuery("projectList", {
    selectFromResult: ({ data }) => ({
      project: data?.entities[projectId],
    }),
  });
  const [updateProject] = useUpdateProjectMutation();

  const getTogglePosition = useCallback(() => {
    if (project?.status === "open") {
      return "justify-start bg-dark-blue";
    }

    if (project?.status === "closed") {
      return "justify-end bg-light-green";
    }
  }, [project]);

  const onUpdateStatus = async () => {
    await updateProject({
      id: project?._id,
      title: project?.title,
      description: project?.description,
      status: project?.status === "closed" ? "open" : "closed",
    });
  };

  return (
    <article className='border w-[260px] h-[175px] rounded-lg py-3 pl-5 pr-2 shadow-md text-header-main'>
      <div className='flex'>
        <div className='bg-neat-purple inline-flex p-1 rounded-lg'>
          <RectangleGroupIcon classNames='h-6 w-6 text-white' />
        </div>
        <div className='flex flex-col text-xs ml-2'>
          <span className='font-medium'>{project?.title}</span>
          <span className='truncate'>{project?.description}</span>
        </div>
      </div>

      <div className='border-b w-full mt-2' />

      <div className='mt-4'>
        <div className='text-xs text-gray-text flex flex-col items-start'>
          <span className='font-semibold mb-1 mr-3 self-center'>STATUS</span>
          <div className='flex items-center space-x-2 self-center'>
            <span
              className={`${
                project?.status === "open" ? "text-dark-blue" : ""
              }`}
            >
              Open
            </span>
            <div
              onClick={onUpdateStatus}
              className={`w-12 h-6 p-1 rounded-full relative z-30 overflow-hidden flex items-center cursor-pointer ${getTogglePosition()}`}
            >
              <motion.div
                layout
                className='h-4 w-4 rounded-full bg-white relative z-40'
              />
            </div>
            <span
              className={`${
                project?.status === "closed" ? "text-light-green" : ""
              }`}
            >
              Closed
            </span>
          </div>
        </div>

        <div className='text-xs mt-5 text-gray-text'>
          <span className='font-semibold'>CREATED</span>
          <p>{moment(project?.createdAt).format("MMMM Do YYYY, h:mm a")}</p>
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
