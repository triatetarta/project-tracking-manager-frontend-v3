import { PlusIcon } from "@heroicons/react/outline";
import { ICreateProjectButtonProps } from "../interfaces/ICreateProjectButton";

const CreateProjectButton = ({
  setCreateNewProject,
}: ICreateProjectButtonProps) => {
  return (
    <button
      type='button'
      onClick={() => setCreateNewProject(true)}
      className='flex items-center justify-center hover:bg-gray-200 px-3 py-3 rounded-lg transition-all duration-200'
    >
      <PlusIcon className='w-3 h-3 text-gray-text' />
      <span className='text-xs font-semibold'>Create Project</span>
    </button>
  );
};

export default CreateProjectButton;
