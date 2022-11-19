import useAuth from "../../hooks/useAuth";
import { ISidebarProps } from "../interfaces/ISidebar";
import PeopleContainer from "./PeopleContainer";
import ProjectsContainer from "./ProjectsContainer";

const Sidebar = ({ setCreateNewProject }: ISidebarProps) => {
  const { name } = useAuth();

  return (
    <aside className='hidden md:flex md:flex-col bg-sidebar-bg w-[300px] lg:w-[200px] min-h-[calc(100vh-5.1rem)] border-l border-r py-10 px-2 text-header-main'>
      <div className='border-b-2'>
        <div className='flex flex-col px-3 pb-2'>
          <p className='text-xs text-gray-text'>Hello,</p>
          <p className='text-base font-semibold'>{name}</p>
        </div>
      </div>

      <ProjectsContainer setCreateNewProject={setCreateNewProject} />

      <PeopleContainer />
    </aside>
  );
};

export default Sidebar;
