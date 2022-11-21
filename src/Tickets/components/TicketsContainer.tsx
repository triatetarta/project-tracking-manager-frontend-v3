import { ITicketsContainer } from "../interfaces/ITicketsContainer";
import { PlusIcon } from "@heroicons/react/solid";
import Ticket from "./Ticket";
import Button from "../../Button/components/Button";

const TicketsContainer = ({
  tickets,
  category,
  icon,
  setCreateNewTicket,
  classNames,
  buttonClassNames,
  hoverClassNames,
}: ITicketsContainer) => {
  return (
    <div
      className={`mt-10 flex flex-col shadow-md border py-4 px-6 rounded-lg w-[320px] bg-pale-bg select-none ${classNames}`}
    >
      <div className='mb-4 flex items-center'>
        <span className='bg-white border rounded-full p-2'>{icon}</span>
        <h2 className='text-lg font-bold uppercase ml-2'>{category}</h2>
      </div>

      <div className='flex flex-col space-y-2'>
        {tickets?.ids
          .filter((ticketId) => tickets.entities[ticketId]?.status === category)
          .map((ticketId) => {
            return (
              <Ticket
                hoverClassNames={hoverClassNames}
                key={ticketId}
                ticketId={ticketId}
              />
            );
          })}
      </div>

      <Button
        onClick={() => setCreateNewTicket(true)}
        classNames={`flex items-center mt-6 hover:bg-opacity-90 transition-all duration-200 px-2 py-3 rounded-lg ${buttonClassNames}`}
        textClassNames='text-xs font-semibold text-white'
        icon={<PlusIcon className='w-3 h-3 text-white' />}
        text='Create Ticket'
      />
    </div>
  );
};

export default TicketsContainer;
