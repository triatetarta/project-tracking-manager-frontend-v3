import { useGetProjectsQuery } from "../features/projectsApiSlice";
import { IProjectProps } from "../interfaces/IProject";

const Project = ({ projectId }: IProjectProps) => {
  const { project } = useGetProjectsQuery("projectList", {
    selectFromResult: ({ data }) => ({
      project: data?.entities[projectId],
    }),
  });

  return (
    <div
      style={{
        backgroundColor: project?.color,
      }}
      className='text-xs font-semibold text-white px-2 py-2 rounded-md select-none capitalize'
    >
      {project?.title}
    </div>
  );
};

export default Project;
