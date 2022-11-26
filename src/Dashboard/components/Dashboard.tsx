import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { PlusIcon } from "@heroicons/react/solid";
import Sidebar from "../../Sidebar/components/Sidebar";
import Tickets from "../../Tickets/components/Tickets";
import NewTicket from "../../Tickets/components/NewTicket";
import NewProject from "../../Projects/components/NewProject";
import Button from "../../Button/components/Button";
import TicketDetails from "../../Tickets/components/TicketDetails";
import { useAppSelector } from "../../app/hooks";
import Modal from "../../Modal/components/Modal";
import { TGetModalType, TGetModalTypeFunc } from "../interfaces/IModalType";
import { EntityId } from "@reduxjs/toolkit";

const Dashboard = () => {
  const { modalOpen } = useAppSelector((state) => state.modal);
  const { isTicketDetailsOpen } = useAppSelector((state) => state.tickets);
  const [createNewTicket, setCreateNewTicket] = useState(false);
  const [createNewProject, setCreateNewProject] = useState(false);
  const [modalType, setModalType] = useState<TGetModalType>("");
  const [id, setId] = useState<string | EntityId>("");

  const getModalType: TGetModalTypeFunc = (type, targetId) => {
    setModalType(type);
    setId(targetId);
  };

  useEffect(() => {
    const element = document.querySelector<HTMLElement>("body");

    if (
      (createNewTicket || createNewProject || isTicketDetailsOpen) &&
      element
    ) {
      element.style.overflow = "hidden";
    }
    if (
      !createNewTicket &&
      !createNewProject &&
      !isTicketDetailsOpen &&
      element
    ) {
      element.style.overflow = "auto";
    }
  }, [createNewTicket, createNewProject, isTicketDetailsOpen]);

  return (
    <main className='container mx-auto flex justify-center px-2'>
      <Sidebar setCreateNewProject={setCreateNewProject} />
      <Tickets setCreateNewTicket={setCreateNewTicket} />
      <div className='container fixed bottom-6 md:bottom-20 pr-4 md:pr-0'>
        <div className='relative'>
          <Button
            onClick={() => setCreateNewTicket(true)}
            classNames='blueGradient text-white self-end mb-4 px-4 py-4 absolute bottom-0 right-0 rounded-full hover:scale-105 active:scale-95 transition-all duration-150'
            icon={<PlusIcon className='w-4 h-4 md:w-8 md:h-8' />}
          />
        </div>
      </div>

      <AnimatePresence>
        {isTicketDetailsOpen && <TicketDetails getModalType={getModalType} />}
      </AnimatePresence>

      <AnimatePresence>
        {createNewTicket ? (
          <NewTicket
            setCreateNewTicket={setCreateNewTicket}
            setCreateNewProject={setCreateNewProject}
          />
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {createNewProject ? (
          <NewProject setCreateNewProject={setCreateNewProject} />
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {modalOpen ? <Modal id={id} type={modalType} /> : null}
      </AnimatePresence>
    </main>
  );
};

export default Dashboard;
