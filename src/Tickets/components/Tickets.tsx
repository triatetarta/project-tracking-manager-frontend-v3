import { ITickets } from "../interfaces/ITickets";
import { useGetTicketsQuery } from "../features/ticketsApiSlice";
import { useGetWorkflowStatusQuery } from "../../WorkflowStatus/features/workflowsApiSlice";
import StatusCard from "../../WorkflowStatus/components/StatusCard";

const Tickets = ({ setCreateNewTicket }: ITickets) => {
  const { data: tickets } = useGetTicketsQuery("ticketList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  const { data: workflowStatus } = useGetWorkflowStatusQuery(
    "workflowStatusList",
    {
      pollingInterval: 60000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    }
  );

  return (
    <section className='min-h-[calc(100vh-17.9rem)] px-2 pb-4 flex items-center flex-col text-header-main relative flex-grow'>
      <div className='flex mt-10 gap-4 flex-wrap justify-center'>
        {workflowStatus?.ids.map((statusId) => {
          return (
            <StatusCard
              setCreateNewTicket={setCreateNewTicket}
              key={statusId}
              statusId={statusId}
              tickets={tickets}
              classNames='flex flex-col justify-between shadow-md border py-4 px-6 rounded-lg w-[290px] bg-pale-bg select-none'
            />
          );
        })}
      </div>
    </section>
  );
};

export default Tickets;
