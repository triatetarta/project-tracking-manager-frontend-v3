import { UserCircleIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../Navigation/components/Logo";
import AuthModal from "./AuthModal";
import Description from "./Description";
import Details from "./Details";
import Plans from "./Plans";
import Showcase from "./Showcase";
import WorkflowInfo from "./WorkflowInfo";

const Home = () => {
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState("register");

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
    <>
      <header className='py-3 sm:py-5 px-2 border-b shadow-md w-screen sticky top-0 bg-white z-40 left-0 right-0 select-none'>
        <nav className='flex items-center justify-between container mx-auto'>
          <div className='flex items-center'>
            <Link to='/'>
              <div className='flex items-center space-x-2'>
                <Logo />
                <h2 className='font-semibold text-lg sm:text-2xl text-header-main'>
                  ProTrack
                </h2>
              </div>
            </Link>
            <div>
              <button
                className='ml-2 z-50 bg-red-600 px-2 py-1 rounded-md text-white text-sm'
                onClick={() => {
                  localStorage.setItem("persist", JSON.stringify(false));
                  window.location.reload();
                }}
              >
                DEBUG
              </button>
            </div>
          </div>

          <button
            onClick={() => {
              setOpenModal(true);
              setModalType("login");
            }}
            className='flex items-center space-x-1 text-light-blue px-2 py-1 rounded-lg hover:bg-gray-100 transition-all duration-200 accountButton'
          >
            <UserCircleIcon className='h-8 w-8 pointer-events-none' />

            <span className='hidden sm:inline-flex font-semibold text-md pointer-events-none'>
              Login
            </span>
          </button>
        </nav>
      </header>

      <main className='container mx-auto px-2 sm:px-0'>
        {openModal ? (
          <AuthModal
            modalType={modalType}
            setModalType={setModalType}
            setOpenModal={setOpenModal}
          />
        ) : null}

        <Showcase setOpenModal={setOpenModal} setModalType={setModalType} />
        <Description />
        <Details />
        <WorkflowInfo classNames='flex flex-col md:flex-row items-center justify-center my-10 md:my-32 text-blue-text select-none' />
        <Plans />
      </main>
    </>
  );
};

export default Home;
