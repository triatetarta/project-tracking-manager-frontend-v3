import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { PlusIcon } from "@heroicons/react/outline";
import { useState } from "react";
import Button from "../../Button/components/Button";
import Project from "../../Projects/components/Project";
import { useGetProjectsQuery } from "../../Projects/features/projectsApiSlice";
import { IProjectsContainer } from "../interfaces/IProjectsContainer";
import useAuth from "../../hooks/useAuth";

const ProjectsContainer = ({ setCreateNewProject }: IProjectsContainer) => {
  const { isAdmin } = useAuth();
  const { data: projects } = useGetProjectsQuery("projectList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const [showProjects, setShowProjects] = useState(true);

  return (
    <div className='px-1 lg:px-4 mt-10'>
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
        {isAdmin ? (
          <Button
            onClick={() => setCreateNewProject(true)}
            classNames='flex items-center justify-center hover:bg-gray-200 px-0 lg:px-2 py-2 rounded-lg transition-all duration-200'
            textClassNames='text-xs font-semibold'
            icon={<PlusIcon className='w-3 h-3 text-gray-text' />}
            text='Create Project'
          />
        ) : null}
      </div>
    </div>
  );
};

export default ProjectsContainer;
