import { motion } from "framer-motion";
import { IProject } from "../../Projects/interfaces/IProject";

type SwitchProps = {
  isOn: boolean;
  handleChecked: () => void;
  getTogglePosition: () => string | undefined;
  project: IProject | undefined;
  isAdmin: boolean;
};

const Switch = ({
  isOn,
  handleChecked,
  getTogglePosition,
  project,
  isAdmin,
}: SwitchProps) => {
  return (
    <>
      <input
        type='checkbox'
        onChange={handleChecked}
        id={project?.id}
        checked={isOn}
        className='hidden'
      />
      <motion.label
        layout
        htmlFor={project?.id}
        className={`flex items-center cursor-pointer w-12 h-6 rounded-full relative z-30 ${getTogglePosition()} 
          ${isAdmin ? "cursor-pointer" : "cursor-default"}
        `}
      >
        <motion.span
          layout
          className='inline-flex mx-1 h-4 w-4 rounded-full bg-white z-40'
        />
      </motion.label>
    </>
  );
};

export default Switch;
