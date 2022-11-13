import { ISidebarProps } from "../interfaces/ISidebar";
import ProjectsContainer from "./ProjectsContainer";

const Sidebar = ({ setCreateNewProject }: ISidebarProps) => {
  return (
    <aside className='hidden md:flex md:flex-col bg-sidebar-bg w-[300px] lg:w-[200px] min-h-[calc(100vh-5.1rem)] border-l border-r py-10 px-2 text-header-main'>
      <div className='border-b-2'>
        <div className='flex flex-col px-3 pb-2'>
          <p className='text-xs text-gray-text'>Hello,</p>
          <p className='text-base font-semibold'>James</p>
        </div>
      </div>

      <ProjectsContainer setCreateNewProject={setCreateNewProject} />

      <div className='px-3 mt-10'>
        <h3 className='uppercase text-xs font-bold mb-2'>Teams</h3>
        <div className='flex flex-col space-y-1'></div>
      </div>
      <div className='px-3 mt-10'>
        <h3 className='uppercase text-xs font-bold'>People</h3>
        <div className='flex items-center flex-wrap mt-2 w-full'></div>
      </div>
    </aside>
  );
};

export default Sidebar;
