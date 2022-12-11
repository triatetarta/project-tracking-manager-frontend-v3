import { motion } from "framer-motion";
import {
  checkIconTransition,
  checkIconVariants,
} from "../../Tutorial/animations";

type CheckIconProps = {
  className?: string;
};

const CheckIcon = (props: CheckIconProps) => {
  return (
    <svg
      {...props}
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      strokeWidth={3}
    >
      <motion.path
        variants={checkIconVariants}
        transition={checkIconTransition}
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M5 13l4 4L19 7'
      />
    </svg>
  );
};

export default CheckIcon;
