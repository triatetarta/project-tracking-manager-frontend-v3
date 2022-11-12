import { ITicketProps } from "../interfaces/ITicket";
import { selectTicketById } from "../features/ticketsApiSlice";
import { useAppSelector } from "../../app/hooks";
import { convertString } from "../../helpers/firstLetterUppercase";

const Ticket = ({ ticketId }: ITicketProps) => {
  const ticket = useAppSelector((state) => selectTicketById(state, ticketId));

  return (
    <article
      // onClick={() => ticketClickHandle(_id)}
      className='ticket bg-ticket-bg hover:bg-ticket-bg-hover transition-all duration-200 cursor-pointer p-4 rounded-lg shadow-sm relative w-[300px]'
    >
      <p className='text-xs mb-6 truncate'>
        {ticket !== undefined ? convertString(ticket?.description) : null}
      </p>

      <div className='text-gray-text text-sm capitalize'>{ticket?.title}</div>
    </article>
  );
};

export default Ticket;
