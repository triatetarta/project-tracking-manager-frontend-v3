import { useEffect, useState } from "react";

const useStyles = (category: string) => {
  const [text, setText] = useState("");
  const [button, setButton] = useState("");
  const [background, setBackground] = useState("");
  const [hover, setHover] = useState("");

  useEffect(() => {
    if (category === "to do") {
      setText("text-medium-blue");
      setButton("bg-medium-blue");
      setBackground("blueGradient text-white");
      setHover("hover:bg-medium-blue/10");
    }
    if (category === "in progress") {
      setText("text-neat-yellow");
      setButton("bg-neat-yellow");
      setBackground("orangeGradient text-white");
      setHover("hover:bg-neat-yellow/10");
    }
    if (category === "closed") {
      setText("text-medium-green");
      setButton("bg-medium-green");
      setBackground("greenGradient text-white");
      setHover("hover:bg-medium-green/10");
    }
  }, [category]);

  return { text, button, background, hover };
};

export default useStyles;
