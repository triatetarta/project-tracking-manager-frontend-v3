import { ITicketProps } from "../interfaces/ITicket";
import { useGetTicketsQuery } from "../features/ticketsApiSlice";
import { convertString } from "../../helpers/firstLetterUppercase";
import { useGetUsersQuery } from "../../Auth/features/usersApiSlice";

const Ticket = ({ ticketId, openTicketDetailsHandler }: ITicketProps) => {
  const { ticket } = useGetTicketsQuery("ticketList", {
    selectFromResult: ({ data }) => ({
      ticket: data?.entities[ticketId],
    }),
  });

  const { user } = useGetUsersQuery("userList", {
    selectFromResult: ({ data: userData }) => ({
      user: ticket === undefined ? {} : userData?.entities[ticket?.user],
    }),
  });

  return (
    <article
      onClick={() => openTicketDetailsHandler(ticketId)}
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
