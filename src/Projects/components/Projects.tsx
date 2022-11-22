import { useGetProjectsQuery } from "../features/projectsApiSlice";
import ProjectCard from "./ProjectCard";
import { PlusIcon } from "@heroicons/react/outline";
import Button from "../../Button/components/Button";
import NewProject from "./NewProject";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";

const Projects = () => {
  const { isAdmin } = useAuth();
  const { data: projects } = useGetProjectsQuery("projectList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const [createNewProject, setCreateNewProject] = useState(false);

  return (
    <main className='container mx-auto flex flex-col px-2'>
      <div className=''>
        <h2 className='mt-6 text-xl font-medium'>YOUR WORK</h2>
        <div className='mt-10'>
          <div className='flex items-center justify-between mb-2'>
            <h3 className='font-medium'>Projects</h3>
            {isAdmin ? (
              <Button
                onClick={() => setCreateNewProject(true)}
                classNames='flex items-center justify-center hover:bg-gray-200 px-3 py-3 rounded-lg transition-all duration-200'
                textClassNames='text-xs font-semibold'
                icon={<PlusIcon className='w-3 h-3 text-gray-text' />}
                text='Create Project'
              />
            ) : null}
          </div>

          <div className='flex items-center flex-wrap gap-4'>
            {projects?.ids.map((projectId) => {
              return <ProjectCard key={projectId} projectId={projectId} />;
            })}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {createNewProject ? (
          <NewProject setCreateNewProject={setCreateNewProject} />
        ) : null}
      </AnimatePresence>
    </main>
  );
};

export default Projects;
