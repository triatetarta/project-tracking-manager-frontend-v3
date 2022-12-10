import { ITickets } from "../interfaces/ITickets";
import { useGetTicketsQuery } from "../features/ticketsApiSlice";
import { useGetWorkflowStatusQuery } from "../../WorkflowStatus/features/workflowsApiSlice";
import StatusCard from "../../WorkflowStatus/components/StatusCard";
import { useEffect } from "react";
import toast from "react-hot-toast";

const Tickets = ({ setCreateNewTicket }: ITickets) => {
  const {
    data: tickets,
    isError,
    error,
  } = useGetTicketsQuery("ticketList", {
    pollingInterval: 60000,
  });
  const { data: workflowStatus } =
    useGetWorkflowStatusQuery("workflowStatusList");

  useEffect(() => {
    if (!isError || error === undefined) return;

    if ("data" in error) {
      toast.error(`${error.status} ${JSON.stringify(error.data)}`);
    }
  }, [isError, error]);

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
