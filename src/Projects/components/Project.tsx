import { useAppSelector } from "../../app/hooks";
import { selectProjectById } from "../features/projectsApiSlice";
import { IProjectProps } from "../interfaces/IProject";

const Project = ({ projectId }: IProjectProps) => {
  const project = useAppSelector((state) =>
    selectProjectById(state, projectId)
  );

  return (
    <div className='text-xs font-semibold bg-projects-bg text-white px-2 py-2 rounded-md select-none capitalize'>
      {project?.title}
    </div>
  );
};

export default Project;
