import { BadgeCheckIcon, ClockIcon } from "@heroicons/react/solid";
import TicketsContainer from "./TicketsContainer";
import { ITickets } from "../interfaces/ITickets";
import { useGetTicketsQuery } from "../features/ticketsApiSlice";
import Todo from "../../Icons/components/Todo";

const Tickets = ({ setCreateNewTicket }: ITickets) => {
  const { data: tickets } = useGetTicketsQuery("ticketList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  return (
    <section className='min-h-[calc(100vh-17.9rem)] px-4 pb-4 flex items-center flex-col text-header-main relative flex-grow'>
      <div className='flex space-x-0 md:space-x-4 flex-wrap justify-center'>
        <TicketsContainer
          tickets={tickets}
          category='to do'
          icon={<Todo classNames='w-6 h-6 text-deep-blue' />}
          setCreateNewTicket={setCreateNewTicket}
          classNames='text-medium-blue'
          buttonClassNames='bg-medium-blue'
          hoverClassNames='hover:bg-medium-blue/10'
        />
        <TicketsContainer
          tickets={tickets}
          category='in progress'
          icon={<ClockIcon className='w-6 h-6 text-neat-yellow' />}
          setCreateNewTicket={setCreateNewTicket}
          classNames='text-neat-yellow'
          buttonClassNames='bg-neat-yellow'
          hoverClassNames='hover:bg-neat-yellow/10'
        />
        <TicketsContainer
          tickets={tickets}
          category='closed'
          icon={<BadgeCheckIcon className='w-6 h-6 text-medium-green' />}
          setCreateNewTicket={setCreateNewTicket}
          classNames='text-medium-green'
          buttonClassNames='bg-medium-green'
          hoverClassNames='hover:bg-medium-green/10'
        />
      </div>
    </section>
  );
};

export default Tickets;
