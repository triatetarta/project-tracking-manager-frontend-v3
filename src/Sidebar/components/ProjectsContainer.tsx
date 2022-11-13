import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { useState } from "react";
import CreateProjectButton from "../../Projects/components/CreateProjectButton";
import Project from "../../Projects/components/Project";
import { useGetProjectsQuery } from "../../Projects/features/projectsApiSlice";
import { IProjectsContainer } from "../interfaces/IProjectsContainer";

const ProjectsContainer = ({ setCreateNewProject }: IProjectsContainer) => {
  const { data: projects } = useGetProjectsQuery("projectList", {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const [showProjects, setShowProjects] = useState(true);

  return (
    <div className='px-3 mt-10'>
      <h3
        onClick={() => setShowProjects(!showProjects)}
        className='uppercase text-xs font-bold mb-2 inline-flex items-center cursor-pointer select-none'
      >
        {showProjects ? (
          <ChevronDownIcon className='w-4 h-4' />
        ) : (
          <ChevronRightIcon className='w-4 h-4' />
        )}
        Projects
      </h3>
      {showProjects ? (
        <div className='flex flex-col space-y-1'>
          {projects?.ids.map((projectId) => {
            return <Project key={projectId} projectId={projectId} />;
          })}
        </div>
      ) : null}

      <div className='mt-2'>
        <CreateProjectButton setCreateNewProject={setCreateNewProject} />
      </div>
    </div>
  );
};

export default ProjectsContainer;
