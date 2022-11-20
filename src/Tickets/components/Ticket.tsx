import { ITicketProps } from "../interfaces/ITicket";
import { useGetTicketsQuery } from "../features/ticketsApiSlice";
import { convertString } from "../../helpers/firstLetterUppercase";

const Ticket = ({
  ticketId,
  openTicketDetailsHandler,
  hoverClassNames,
}: ITicketProps) => {
  const { ticket } = useGetTicketsQuery("ticketList", {
    selectFromResult: ({ data }) => ({
      ticket: data?.entities[ticketId],
    }),
  });

  return (
    <article
      onClick={() => openTicketDetailsHandler(ticketId)}
      className={`ticket bg-white border transition-all duration-200 cursor-pointer p-4 rounded-lg shadow-sm relative w-full ${hoverClassNames}`}
    >
      <p className='text-xs mb-6 truncate text-blue-text'>
        {ticket !== undefined ? convertString(ticket?.description) : null}
      </p>

      <div className='text-gray-text text-sm capitalize'>{ticket?.title}</div>
    </article>
  );
};

export default Ticket;
