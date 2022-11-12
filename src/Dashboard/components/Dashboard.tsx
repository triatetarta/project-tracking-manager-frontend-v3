import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { PlusIcon } from "@heroicons/react/solid";
import Sidebar from "../../Sidebar/components/Sidebar";
import Tickets from "../../Tickets/components/Tickets";
import NewTicket from "../../Tickets/components/NewTicket";
import NewProject from "../../Projects/components/NewProject";

const Dashboard = () => {
  const [createNewTicket, setCreateNewTicket] = useState(false);
  const [createNewProject, setCreateNewProject] = useState(false);

  return (
    <main className='container mx-auto flex items-center justify-center px-2'>
      {/* 
      <AnimatePresence>
        {openTicket && (
          <TicketDetails
            ticketId={selectedId}
            closeTicketDetails={closeTicketDetails}
          />
        )}
      </AnimatePresence>

      <TicketsInfo /> */}

      <Sidebar setCreateNewProject={setCreateNewProject} />
      <Tickets setCreateNewTicket={setCreateNewTicket} />
      <div className='container fixed bottom-6 md:bottom-20 pr-4 md:pr-0'>
        <div className='relative'>
          <button
            onClick={() => setCreateNewTicket(true)}
            className='bg-deep-blue text-white self-end mb-4 px-4 py-4 absolute bottom-0 right-0 rounded-full hover:bg-light-blue hover:scale-105 active:scale-95 transition-all duration-150'
          >
            <PlusIcon className='w-4 h-4 md:w-8 md:h-8' />
          </button>
        </div>
      </div>

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
    </main>
  );
};

export default Dashboard;
