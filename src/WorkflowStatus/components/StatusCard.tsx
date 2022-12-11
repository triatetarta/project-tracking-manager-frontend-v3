import Ticket from "../../Tickets/components/Ticket";
import { PlusIcon } from "@heroicons/react/solid";
import Button from "../../Button/components/Button";
import { IStatusCardProps } from "../interfaces/IStatusCard";
import { useGetWorkflowStatusQuery } from "../features/workflowsApiSlice";
import { useCallback } from "react";
import { BadgeCheckIcon, ClockIcon } from "@heroicons/react/solid";
import Todo from "../../Icons/components/Todo";
import useStyles from "../../hooks/useStyles";
import Skeleton from "../../Skeletons/components/Skeleton";

const StatusCard = ({
  statusId,
  classNames,
  tickets,
  workflow,
  isTicketsLoading,
  setCreateNewTicket = () => null,
}: IStatusCardProps) => {
  const { workflowStatus } = useGetWorkflowStatusQuery("workflowStatusList", {
    selectFromResult: ({ data }) => ({
      workflowStatus: data?.entities[statusId!],
    }),
  });

  const filteredTicket = tickets?.ids
    .map((ticketID) => {
      const ticket = tickets.entities[ticketID];

      return ticket;
    })
    .filter((ticket) => ticket?.status === statusId);

  const { text, button } = useStyles(workflowStatus?.category!);

  const renderIcons = useCallback(() => {
    if (workflowStatus?.category === "to do") {
      return <Todo classNames='h-4 w-4 sm:w-6 sm:h-6 text-deep-blue' />;
    }
    if (workflowStatus?.category === "in progress") {
      return <ClockIcon className='h-4 w-4 sm:w-6 sm:h-6 text-neat-yellow' />;
    }
    if (workflowStatus?.category === "closed") {
      return (
        <BadgeCheckIcon className='h-4 w-4 sm:w-6 sm:h-6 text-medium-green' />
      );
    }
  }, [workflowStatus]);

  return (
    <div className={classNames}>
      <div className='mb-4 flex items-center'>
        <span className='bg-white border rounded-full p-2'>
          {renderIcons()}
        </span>
        <h2 className={`text-base sm:text-lg font-bold uppercase ml-2 ${text}`}>
          {workflowStatus?.title}
        </h2>
      </div>

      {workflow ? (
        <p className='text-right text-xs text-gray-text font-semibold'>
          TICKETS: {filteredTicket?.length}
        </p>
      ) : null}

      {!workflow ? (
        <>
          {isTicketsLoading ? (
            <Skeleton
              elements={2}
              midClassNames='relative overflow-hidden h-20 w-full'
              outerClassNames='flex flex-col space-y-2'
              skeletonClassNames='h-full w-full'
            />
          ) : (
            <div className='flex flex-col space-y-2'>
              {tickets?.ids
                .filter(
                  (ticketId) => tickets.entities[ticketId]?.status === statusId
                )
                .map((ticketId) => {
                  return (
                    <Ticket
                      key={ticketId}
                      ticketId={ticketId}
                      category={workflowStatus?.category!}
                    />
                  );
                })}
            </div>
          )}

          <Button
            onClick={() => setCreateNewTicket(true)}
            classNames={`flex items-center mt-6 hover:bg-opacity-90 transition-all duration-200 px-2 py-3 rounded-lg ${button}`}
            textClassNames='text-xs font-semibold text-white'
            icon={<PlusIcon className='w-3 h-3 text-white' />}
            text='Create Ticket'
          />
        </>
      ) : null}
    </div>
  );
};

export default StatusCard;
