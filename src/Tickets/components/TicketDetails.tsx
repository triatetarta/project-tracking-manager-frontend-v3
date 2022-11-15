import { motion } from "framer-motion";
import { MouseEvent } from "react";
import { useGetTicketsQuery } from "../features/ticketsApiSlice";
import { ITicketDetailsProps } from "../interfaces/ITicketDetails";
import useAuth from "../../hooks/useAuth";
import TicketDetailsHeader from "./TicketDetails/TicketDetailsHeader";
import TicketDetailsInfo from "./TicketDetails/TicketDetailsInfo";

const TicketDetails = ({
  setOpenTicketDetails,
  ticketId,
}: ITicketDetailsProps) => {
  const { id } = useAuth();
  const { ticket } = useGetTicketsQuery("ticketList", {
    selectFromResult: ({ data }) => ({
      ticket: data?.entities[ticketId],
    }),
  });

  const closeHandle = (
    e: MouseEvent<HTMLDivElement> & { target: HTMLDivElement }
  ) => {
    e.stopPropagation();

    if (e.target.classList.contains("ticketClose")) {
      setOpenTicketDetails(false);
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
        className='bg-white py-6 pr-4 pl-6 mt-28 w-[360px] h-2/3 rounded-md shadow-sm overflow-y-scroll scrollBarWidth before:scrollBarTrack scrollBarThumb ticketContent z-50 relative'
      >
        <TicketDetailsHeader
          setOpenTicketDetails={setOpenTicketDetails}
          id={id}
          ticketUserId={ticket?.user}
        />

        <TicketDetailsInfo id={id} ticket={ticket} />
      </motion.div>
    </motion.div>
  );
};

export default TicketDetails;
