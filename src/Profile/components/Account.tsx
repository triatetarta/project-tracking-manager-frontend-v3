import { EntityId } from "@reduxjs/toolkit";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useAppSelector } from "../../app/hooks";
import {
  TGetModalType,
  TGetModalTypeFunc,
} from "../../Dashboard/interfaces/IModalType";
import Modal from "../../Modal/components/Modal";
import TicketDetails from "../../Tickets/components/TicketDetails";
import AccountHeader from "./AccountHeader";
import AccountInfo from "./AccountInfo";
import AccountMain from "./AccountMain";

const Account = () => {
  const { isTicketDetailsOpen } = useAppSelector((state) => state.tickets);
  const { modalOpen } = useAppSelector((state) => state.modal);

  const [modalType, setModalType] = useState<TGetModalType>("");
  const [id, setId] = useState<string | EntityId>("");

  const getModalType: TGetModalTypeFunc = (type, targetId) => {
    setModalType(type);
    setId(targetId);
  };

  return (
    <section className='flex flex-col min-h-[calc(100vh-17.9rem)]'>
      <AccountHeader />

      <main className='container mx-auto px-2 flex flex-col-reverse md:flex-row space-x-0 md:space-x-10 mt-20'>
        <AccountInfo />
        <AccountMain />
      </main>

      <AnimatePresence>
        {isTicketDetailsOpen && <TicketDetails getModalType={getModalType} />}
      </AnimatePresence>

      <AnimatePresence>
        {modalOpen ? <Modal id={id} type={modalType} /> : null}
      </AnimatePresence>
    </section>
  );
};

export default Account;
