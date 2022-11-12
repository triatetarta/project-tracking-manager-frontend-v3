import {
  BadgeCheckIcon,
  DocumentTextIcon,
  ClockIcon,
} from "@heroicons/react/solid";
import TicketsContainer from "./TicketsContainer";
import { ITickets } from "../interfaces/ITickets";
import { useGetTicketsQuery } from "../features/ticketsApiSlice";

const Tickets = ({ setCreateNew }: ITickets) => {
  const { data: tickets } = useGetTicketsQuery();

  return (
    <section className='min-h-[calc(100vh-17.9rem)] px-4 pb-4 flex items-center flex-col text-header-main relative flex-grow'>
      <div className='flex space-x-0 md:space-x-4 flex-wrap justify-center'>
        <TicketsContainer
          tickets={tickets}
          category='to do'
          icon={<DocumentTextIcon className='w-6 h-6 text-deep-blue' />}
          setCreateNew={setCreateNew}
        />
        <TicketsContainer
          tickets={tickets}
          category='in progress'
          icon={<ClockIcon className='w-6 h-6 text-flow-yellow-deep' />}
          setCreateNew={setCreateNew}
        />
        <TicketsContainer
          tickets={tickets}
          category='closed'
          icon={<BadgeCheckIcon className='w-6 h-6 text-flow-green-deep' />}
          setCreateNew={setCreateNew}
        />
      </div>
    </section>
  );
};

export default Tickets;
