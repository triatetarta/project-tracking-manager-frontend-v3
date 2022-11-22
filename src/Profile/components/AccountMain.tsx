import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Ticket from "../../Tickets/components/Ticket";
import { useGetTicketsQuery } from "../../Tickets/features/ticketsApiSlice";

const AccountMain = () => {
  const { data: tickets } = useGetTicketsQuery("ticketList");
  const [hasTickets, setHasTickets] = useState(true);

  const navigate = useNavigate();

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
            <div className='flex flex-col space-y-4'>
              {tickets?.ids.map((ticketId) => {
                return (
                  <Ticket
                    key={ticketId}
                    ticketId={ticketId}
                    account
                    setHasTickets={setHasTickets}
                  />
                );
              })}
            </div>

            <button
              onClick={() => navigate("/dashboard")}
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
