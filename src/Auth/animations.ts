export const tickVariants = {
  unchecked: {
    pathLength: 0,
    fill: "rgba(19, 187, 112, 0)",
    transition: { delay: 0.1, duration: 1.5 },
  },
  checked: {
    pathLength: 1,
    fill: "rgba(19, 187, 112,0)",
    transition: { delay: 0.5, duration: 1.5 },
  },
  done: {
    strokeWidth: 0,
    fill: "rgba(19, 187, 112,1)",
    transition: { duration: 0.8 },
  },
};
