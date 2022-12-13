import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Ticket from "../../Tickets/components/Ticket";
import { useGetTicketsQuery } from "../../Tickets/features/ticketsApiSlice";
import { useGetWorkflowStatusQuery } from "../../WorkflowStatus/features/workflowsApiSlice";
import toast from "react-hot-toast";
import Skeleton from "../../Skeletons/components/Skeleton";

const AccountMain = () => {
  const {
    data: tickets,
    isError: isTicketsError,
    error: ticketsError,
    isLoading: isTicketsLoading,
  } = useGetTicketsQuery("ticketList");
  const { data: workflowStatus } =
    useGetWorkflowStatusQuery("workflowStatusList");

  const [hasTickets, setHasTickets] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isTicketsError || ticketsError === undefined) return;

    if ("data" in ticketsError) {
      toast.error(
        `${ticketsError.status} ${JSON.stringify(ticketsError.data)}`
      );
    }
  }, [isTicketsError, ticketsError]);

  return (
    <div className='flex flex-col space-y-4 w-full h-full'>
      <div className='flex flex-col text-header-main'>
        <h5 className='font-semibold'>Worked on</h5>
        <p className='text-gray-text text-xs'>
          See every ticket you have created
        </p>
      </div>

      {!hasTickets ? (
        <div className='border rounded-lg p-6 text-header-main'>
          <div className='flex flex-col justify-center items-center'>
            <h4 className='text-xl font-semibold'>
              There is no work to see here
            </h4>
            <p className='text-sm'>Things you created or edited</p>
          </div>
        </div>
      ) : (
        <>
          <div className='border rounded-lg p-5 bg-pale-bg shadow-sm'>
            {isTicketsLoading ? (
              <Skeleton
                elements={2}
                midClassNames='relative overflow-hidden h-20 w-full'
                outerClassNames='flex flex-col space-y-4'
                skeletonClassNames='h-full w-full'
              />
            ) : (
              <div className='flex flex-col space-y-4'>
                {tickets?.ids.map((ticketId) => {
                  const ticket = tickets.entities[ticketId];

                  const category = workflowStatus?.ids
                    .map((statusId) => {
                      const singleStatus = workflowStatus.entities[statusId];

                      return singleStatus;
                    })
                    .find((item) => item?.id === ticket?.status);

                  return (
                    <Ticket
                      category={category?.category}
                      key={ticketId}
                      ticketId={ticketId}
                      account
                      setHasTickets={setHasTickets}
                    />
                  );
                })}
              </div>
            )}

            <button
              onClick={() => navigate("/")}
              className='text-xs text-gray-text hover:underline ml-3 mt-6'
            >
              View all
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AccountMain;
