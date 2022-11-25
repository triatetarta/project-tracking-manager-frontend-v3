import { useState } from "react";
import { XIcon, DotsHorizontalIcon } from "@heroicons/react/solid";
import { ITicketDetailsHeaderProps } from "./interfaces/ITicketDetails";
import { useAppDispatch } from "../../../app/hooks";
import { setModalOpen } from "../../../Modal/features/modalSlice";
import TicketIcon from "../../../Icons/components/TicketIcon";
import { setTicketDetailsClose } from "../../features/ticketsSlice";
import useStyles from "../../../hooks/useStyles";

const TicketDetailsHeader = ({
  id,
  ticketUserId,
  ticketId,
  getModalType,
  category,
}: ITicketDetailsHeaderProps) => {
  const [ticketMenuOpen, setTicketMenuOpen] = useState(false);

  const { text } = useStyles(category!);

  const dispatch = useAppDispatch();

  const onTicketDeleteButton = () => {
    dispatch(setModalOpen());
    getModalType("ticket", ticketId);
  };

  return (
    <div className='flex items-center justify-between mb-10 select-none'>
      <div className={"flex items-center justify-center"}>
        <span className='p-2 bg-white rounded-full border'>
          <TicketIcon classNames={`h-6 w-6 ${text}`} />
        </span>
        <h3 className={`ml-2 text-sm font-semibold uppercase ${text}`}>
          Ticket Details
        </h3>
      </div>

      <div className='flex items-center space-x-1.5'>
        {id === ticketUserId ? (
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
                onClick={onTicketDeleteButton}
                className={`absolute -bottom-9 -left-5 border rounded-md px-2 py-1 z-40 text-sm hover:bg-gray-100 transition-all duration-200 select-none`}
              >
                Delete
              </button>
            )}
          </div>
        ) : null}

        <div
          onClick={() => dispatch(setTicketDetailsClose())}
          className='h-10 w-10 flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-all duration-200 rounded-lg ticketClose '
        >
          <XIcon className='h-6 w-6 ticketClose' />
        </div>
      </div>
    </div>
  );
};

export default TicketDetailsHeader;
