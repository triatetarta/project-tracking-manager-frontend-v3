import { useEffect, useState } from "react";
import AuthModal from "./AuthModal";
import Description from "./Description";
import Details from "./Details";
import Plans from "./Plans";
import Showcase from "./Showcase";
import WorkflowInfo from "./WorkflowInfo";

const Home = () => {
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const element = document.querySelector<HTMLElement>("body");

    if (openModal && element) {
      element.style.overflow = "hidden";
    }
    if (!openModal && element) {
      element.style.overflow = "auto";
    }
  }, [openModal]);

  return (
    <main className='container mx-auto px-2 sm:px-0'>
      {openModal ? <AuthModal setOpenModal={setOpenModal} /> : null}

      <Showcase setOpenModal={setOpenModal} />
      <Description />
      <Details />
      <WorkflowInfo classNames='flex flex-col md:flex-row items-center justify-center my-10 md:my-32 text-blue-text select-none' />
      <Plans />
    </main>
  );
};

export default Home;
