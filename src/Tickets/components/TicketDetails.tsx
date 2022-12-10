import { motion } from "framer-motion";
import { MouseEvent } from "react";
import { useGetTicketsQuery } from "../features/ticketsApiSlice";
import { ITicketDetailsProps } from "../interfaces/ITicketDetails";
import useAuth from "../../hooks/useAuth";
import TicketDetailsHeader from "./TicketDetails/TicketDetailsHeader";
import TicketDetailsInfo from "./TicketDetails/TicketDetailsInfo";
import Comments from "../../Comments/components/Comments";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setTicketDetailsClose } from "../features/ticketsSlice";
import { useGetWorkflowStatusQuery } from "../../WorkflowStatus/features/workflowsApiSlice";
import SkeletonTicketDetails from "../../Skeletons/components/SkeletonTicketDetails";

const TicketDetails = ({ getModalType }: ITicketDetailsProps) => {
  const { id } = useAuth();
  const { ticketId } = useAppSelector((state) => state.tickets);
  const { ticket, isLoading: isTicketLoading } = useGetTicketsQuery(
    "ticketList",
    {
      selectFromResult: ({ data, isLoading }) => ({
        ticket: data?.entities[ticketId],
        isLoading,
      }),
    }
  );

  const { workflowStatus } = useGetWorkflowStatusQuery("workflowStatusList", {
    selectFromResult: ({ data }) => ({
      workflowStatus: data?.entities[ticket?.status!],
    }),
  });

  const dispatch = useAppDispatch();

  const closeHandle = (
    e: MouseEvent<HTMLDivElement> & { target: HTMLDivElement }
  ) => {
    e.stopPropagation();

    if (e.target.classList.contains("ticketClose")) {
      dispatch(setTicketDetailsClose());
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1 }}
      onClick={closeHandle}
      className='bg-black/20 backdrop-blur-sm fixed top-0 left-0 w-full h-full z-40 flex justify-center items-start ticketClose text-header-main'
    >
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className='bg-pale-bg py-6 pr-4 pl-6 mt-28 w-[360px] h-2/3 rounded-md shadow-sm overflow-y-scroll scrollBarWidth before:scrollBarTrack scrollBarThumb ticketContent z-50 relative'
      >
        {isTicketLoading ? (
          <SkeletonTicketDetails />
        ) : (
          <>
            <TicketDetailsHeader
              id={id}
              ticketUserId={ticket?.user}
              ticketId={ticketId}
              getModalType={getModalType}
              category={workflowStatus?.category}
            />

            <TicketDetailsInfo
              id={id}
              ticket={ticket}
              category={workflowStatus?.category}
            />
          </>
        )}

        <Comments ticketId={ticketId} getModalType={getModalType} />
      </motion.div>
    </motion.div>
  );
};

export default TicketDetails;
