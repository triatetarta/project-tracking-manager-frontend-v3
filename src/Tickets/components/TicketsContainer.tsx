import { ITicketsContainer } from "../interfaces/ITicketsContainer";
import { PlusIcon } from "@heroicons/react/solid";
import Ticket from "./Ticket";

const TicketsContainer = ({
  tickets,
  category,
  icon,
  setCreateNewTicket,
}: ITicketsContainer) => {
  return (
    <div className='mt-10 flex flex-col bg-gray-100 py-4 px-6 rounded-lg'>
      <div className='mb-4 flex items-center'>
        <span className='bg-ticket-bg rounded-full p-2'>{icon}</span>
        <h2 className='text-lg font-medium text-gray-text capitalize ml-2'>
          {category}
        </h2>
      </div>

      <div className='flex flex-col space-y-2'>
        {tickets?.ids
          .filter((ticketId) => tickets.entities[ticketId]?.status === category)
          .map((ticketId) => {
            return <Ticket key={ticketId} ticketId={ticketId} />;
          })}
      </div>

      <button
        onClick={() => setCreateNewTicket(true)}
        className='flex items-center mt-3 hover:bg-gray-200 transition-all duration-200 px-2 py-3 rounded-lg'
      >
        <PlusIcon className='w-3 h-3 text-gray-text' />
        <span className='text-xs font-semibold'>Create Ticket</span>
      </button>
    </div>
  );
};

export default TicketsContainer;
