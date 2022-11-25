import { ITicketProps } from "../interfaces/ITicket";
import { useGetTicketsQuery } from "../features/ticketsApiSlice";
import { convertString } from "../../helpers/firstLetterUppercase";
import useAuth from "../../hooks/useAuth";
import { useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import { setTicketDetailsOpen } from "../features/ticketsSlice";
import moment from "moment";
import useStyles from "../../hooks/useStyles";
import { useGetProjectsQuery } from "../../Projects/features/projectsApiSlice";

const Ticket = ({
  category,
  ticketId,
  account,
  setHasTickets = () => console.log(""),
}: ITicketProps) => {
  const { id } = useAuth();
  const { ticket } = useGetTicketsQuery("ticketList", {
    selectFromResult: ({ data }) => ({
      ticket: data?.entities[ticketId],
    }),
  });

  const { data: projects } = useGetProjectsQuery("projectList");

  const currentTicketProject = projects?.ids
    .map((projectId) => {
      const singleStatus = projects.entities[projectId];

      return singleStatus;
    })
    .find((item) => item?.id === ticket?.project);

  const { hover, background } = useStyles(category!);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!account || ticket?.user === id) return;

    setHasTickets(false);
  }, [account, ticket, id]);

  if (account && ticket?.user !== id) return null;

  return (
    <article
      onClick={() => {
        dispatch(setTicketDetailsOpen(ticketId));
      }}
      className={`ticket bg-white border transition-all duration-200 cursor-pointer p-4 rounded-lg shadow-sm relative w-full ${hover}`}
      style={{
        borderBottomColor: currentTicketProject?.color,
        borderBottomWidth: "4px",
      }}
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
          <span className='text-gray-text text-sm'>
            {currentTicketProject?.title}
          </span>
        </div>
      ) : null}

      {account ? (
        <div>
          <span className='font-semibold text-xs mr-2 mt-1 text-gray-text'>
            STATUS:
          </span>
          <span
            className={`${background} px-2 py-1 rounded-lg text-xs uppercase`}
          >
            {category}
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
