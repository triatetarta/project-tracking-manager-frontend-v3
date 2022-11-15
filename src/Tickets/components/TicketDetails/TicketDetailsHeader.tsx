import { useState } from "react";
import { XIcon, DotsHorizontalIcon } from "@heroicons/react/solid";
import { TicketIcon } from "@heroicons/react/outline";
import { ITicketDetailsHeaderProps } from "./interfaces/ITicketDetails";

const TicketDetailsHeader = ({
  id,
  ticketUserId,
  setOpenTicketDetails,
}: ITicketDetailsHeaderProps) => {
  const [ticketMenuOpen, setTicketMenuOpen] = useState(false);

  return (
    <div className='flex items-center justify-between mb-10 select-none'>
      <div className='flex items-center justify-center'>
        <span>
          <TicketIcon className='h-6 w-6 text-header-main' />
        </span>
        <h3 className='ml-1 font-medium'>Ticket Details</h3>
      </div>

      <div className='flex items-center space-x-1.5'>
        {id === ticketUserId && (
          <div className='relative'>
            <div
              onClick={() => setTicketMenuOpen(!ticketMenuOpen)}
              className={`h-10 w-10 flex items-center justify-center cursor-pointer ${
                ticketMenuOpen ? "bg-header-main" : "hover:bg-gray-100"
              } transition-all duration-200 rounded-lg`}
            >
              <DotsHorizontalIcon
                className={`${ticketMenuOpen ? "text-white" : ""} h-6 w-6`}
              />
            </div>

            {ticketMenuOpen && (
              <button
                // onClick={onTicketDelete}
                className={`absolute -bottom-9 -left-5 border rounded-md px-2 py-1 z-40 text-sm hover:bg-gray-100 transition-all duration-200 select-none`}
              >
                Delete
              </button>
            )}
          </div>
        )}

        <div
          onClick={() => setOpenTicketDetails(false)}
          className='h-10 w-10 flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-all duration-200 rounded-lg ticketClose '
        >
          <XIcon className='h-6 w-6 ticketClose' />
        </div>
      </div>
    </div>
  );
};

export default TicketDetailsHeader;
