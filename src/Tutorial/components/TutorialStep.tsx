import { AnimatePresence, motion } from "framer-motion";
import CheckIcon from "../../Icons/components/CheckIcon";
import {
  backGroundTransition,
  backgroundVariants,
  rippleTransition,
  rippleVariants,
} from "../animations";

type TutorialStepProps = {
  step: number;
  currentStep: number;
};

const TutorialStep = ({ step, currentStep }: TutorialStepProps) => {
  const status =
    currentStep === step
      ? "active"
      : currentStep < step
      ? "inactive"
      : "complete";

  return (
    <motion.div animate={status} initial={status} className='relative'>
      <motion.div
        transition={rippleTransition}
        variants={rippleVariants}
        className='absolute inset-0 rounded-full'
      />
      <motion.div
        variants={backgroundVariants}
        transition={backGroundTransition}
        className='flex h-10 w-10 items-center justify-center rounded-full border-2 relative'
      >
        <div className='flex items-center justify-center'>
          <AnimatePresence>
            {status === "complete" ? (
              <div className='text-white'>
                <CheckIcon className='h-6 w-6 text-white' />
              </div>
            ) : (
              <motion.span
                key='step'
                animate={{ opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                className='absolute'
              >
                {step}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TutorialStep;
