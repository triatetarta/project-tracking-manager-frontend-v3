import { useGetProjectsQuery } from "../features/projectsApiSlice";
import ProjectCard from "./ProjectCard";
import { PlusIcon } from "@heroicons/react/outline";
import Button from "../../Button/components/Button";
import NewProject from "./NewProject";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import projectBackground from "../../../public/assets/images/project.svg";
import { useNavigate } from "react-router-dom";

const Projects = () => {
  const { isAdmin } = useAuth();
  const { data: projects } = useGetProjectsQuery("projectList", {
    pollingInterval: 60000,
  });

  const [createNewProject, setCreateNewProject] = useState(false);

  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate("/dashboard");
  };

  useEffect(() => {
    const element = document.querySelector<HTMLElement>("body");

    if (createNewProject && element) {
      element.style.overflow = "hidden";
    }
    if (!createNewProject && element) {
      element.style.overflow = "auto";
    }
  }, [createNewProject]);

  return (
    <main className='container mx-auto flex flex-col px-2 text-header-main'>
      <div className='px-2'>
        <h2 className='mt-6 text-base sm:text-xl font-medium'>YOUR WORK</h2>
        <div className='mt-4 sm:mt-10'>
          <div className='flex items-center justify-between mb-2'>
            <h3 className='text-sm sm:text-base font-medium'>Projects</h3>
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

          <div className='flex items-center justify-center sm:justify-start flex-wrap gap-4'>
            {projects?.ids.map((projectId) => {
              return <ProjectCard key={projectId} projectId={projectId} />;
            })}
          </div>
        </div>

        <div className='border-b-2 text-gray-text my-8 sm:my-12' />

        <div className='flex flex-col items-center justify-center'>
          <div className='bg-gradient-to-tr from-deep-blue to-light-blue rounded-md flex items-center justify-center py-4 px-4 w-full sm:w-[300px]'>
            <div className='w-full'>
              <img src={projectBackground} alt='project' />
            </div>
          </div>

          <div className='text-center mt-6'>
            <h4 className='text-sm sm:text-xl font-semibold'>
              Are you excited to work on a project?
            </h4>
            <p className='w-full sm:w-[350px] text-xs sm:text-sm mt-2 text-gray-text'>
              In this page, admins can create or update a project. Other users
              can view the project details.
            </p>

            <Button
              classNames='bg-medium-blue mt-4 mb-6 text-white py-2 px-3 rounded-md hover:bg-light-blue transition-all duration-100 text-xs sm:text-sm disabled:bg-gray-text/80 hover:disabled:bg-gray-text/80'
              textClassNames='text-sm'
              text='Go To Tickets'
              onClick={onClickHandler}
            />
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
