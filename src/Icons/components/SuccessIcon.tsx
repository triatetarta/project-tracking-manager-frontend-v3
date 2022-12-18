import { motion, useAnimationControls } from "framer-motion";
import { useEffect } from "react";

export const tickVariants = {
  unchecked: {
    pathLength: 0,
    fill: "rgba(19, 187, 112, 0)",
  },
  checked: {
    pathLength: 1,
    fill: "rgba(19, 187, 112,0)",
    transition: { duration: 1.2 },
  },
  done: {
    strokeWidth: 0,
    fill: "rgba(19, 187, 112,1)",
    transition: { duration: 0.5 },
  },
};

type SuccessIconProps = {
  className?: string;
  setCompleted: React.Dispatch<React.SetStateAction<boolean>>;
};

const SuccessIcon = (props: SuccessIconProps) => {
  const { setCompleted } = props;

  const controls = useAnimationControls();

  const sequence = async () => {
    await controls.start("unchecked");
    await controls.start("checked");
    await controls.start("done");
    await setCompleted(true);
  };

  useEffect(() => {
    sequence();
  }, []);

  return (
    <svg
      className='mx-auto h-8 w-8'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='-16 -16 100 100'
    >
      <motion.path
        variants={tickVariants}
        animate={controls}
        fillRule='evenodd'
        clipRule='evenodd'
        fill='transparent'
        d='M0 34C0 15.2223 15.2223 0 34 0C52.7777 0 68 15.2223 68 34C68 52.7777 52.7777 68 34 68C15.2223 68 0 52.7777 0 34ZM32.0567 40.0933L47.4185 24.7315C48.3319 23.8804 49.7553 23.9055 50.6381 24.7883C51.5209 25.6711 51.546 27.0945 50.6949 28.0079L33.6949 45.0079C32.7898 45.9118 31.3236 45.9118 30.4185 45.0079L19.6003 34.1897C18.7492 33.2763 18.7743 31.8529 19.6571 30.9701C20.5399 30.0873 21.9633 30.0622 22.8767 30.9133L32.0567 40.0933Z'
        stroke='#13BB70'
        strokeWidth='2'
        strokeLinecap='round'
      />
    </svg>
  );
};

export default SuccessIcon;
