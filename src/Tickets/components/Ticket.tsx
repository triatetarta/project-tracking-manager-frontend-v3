import { ITicketProps } from "../interfaces/ITicket";
import { useGetTicketsQuery } from "../features/ticketsApiSlice";
import { convertString } from "../../helpers/firstLetterUppercase";
import useAuth from "../../hooks/useAuth";
import { useCallback, useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import { setTicketDetailsOpen } from "../features/ticketsSlice";
import moment from "moment";

const Ticket = ({
  ticketId,
  hoverClassNames,
  account,
  setHasTickets = () => console.log(""),
}: ITicketProps) => {
  const { id } = useAuth();
  const { ticket } = useGetTicketsQuery("ticketList", {
    selectFromResult: ({ data }) => ({
      ticket: data?.entities[ticketId],
    }),
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!account || ticket?.user === id) return;

    setHasTickets(false);
  }, [account, ticket, id]);

  const localStyles = useCallback(() => {
    if (ticket?.status === "to do") {
      return {
        background: "blueGradient text-white",
        text: "text-medium-blue",
        hover: "hover:bg-medium-blue/10",
      };
    } else if (ticket?.status === "in progress") {
      return {
        background: "orangeGradient text-white",
        text: "text-neat-yellow",
        hover: "hover:bg-neat-yellow/10",
      };
    } else if (ticket?.status === "closed") {
      return {
        background: "greenGradient text-white",
        text: "text-medium-green",
        hover: "hover:bg-medium-green/10",
      };
    }
  }, [ticket]);

  if (account && ticket?.user !== id) return null;

  return (
    <article
      onClick={() => {
        dispatch(setTicketDetailsOpen(ticketId));
      }}
      className={`ticket bg-white border transition-all duration-200 cursor-pointer p-4 rounded-lg shadow-sm relative w-full ${
        account ? localStyles()?.hover : hoverClassNames
      }`}
    >
      {!account ? (
        <p className='text-xs mb-6 truncate text-blue-text'>
          {ticket !== undefined ? convertString(ticket?.description) : null}
        </p>
      ) : null}

      <div className='text-gray-text text-sm capitalize'>
        {account && <span className='font-semibold text-xs mr-2'>TITLE: </span>}
        {ticket?.title}
      </div>

      {account ? (
        <div>
          <span className='font-semibold text-xs mr-2 text-gray-text'>
            PROJECT:
          </span>
          <span className='text-gray-text text-sm'>{ticket?.project}</span>
        </div>
      ) : null}

      {account ? (
        <div>
          <span className='font-semibold text-xs mr-2 mt-1 text-gray-text'>
            STATUS:
          </span>
          <span
            className={`${
              localStyles()?.background
            } px-2 py-1 rounded-lg text-xs`}
          >
            {ticket?.status}
          </span>
        </div>
      ) : null}

      {account ? (
        <p className='text-xs text-gray-text mt-3'>
          <span className='mr-1'>You created this</span>
          {moment(moment(ticket?.createdAt).local().format()).fromNow()}
        </p>
      ) : null}
    </article>
  );
};

export default Ticket;
