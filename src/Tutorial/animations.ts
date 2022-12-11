const x = 1;
const t = (v: number) => x * v;
export const backGroundTransition = {
  duration: t(0.2),
};

export const backgroundVariants = {
  inactive: {
    background: "#fff",
    borderColor: "#d2d6dc",
    color: "#6B778C",
  },
  active: {
    background: "#fff",
    borderColor: "#2074e3",
    color: "#2074e3",
  },
  complete: {
    background: "#2074e3",
    borderColor: "#2074e3",
  },
};

export const rippleTransition = {
  duration: t(0.6),
  delay: t(0.2),
  type: "tween",
  ease: "circOut",
};

export const rippleVariants = {
  inactive: {
    background: "#B3D4FF",
  },
  active: {
    background: "#B3D4FF",
    scale: 1,
    transition: {
      duration: t(0.3),
      type: "tween",
      ease: "circOut",
    },
  },
  complete: {
    background: "#B3D4FF",
    scale: 1.25,
  },
};

export const checkIconTransition = {
  ease: "easeOut",
  type: "tween",
  delay: t(0.2),
  duration: t(0.3),
};

export const checkIconVariants = {
  complete: {
    pathLength: [0, 1],
  },
};
