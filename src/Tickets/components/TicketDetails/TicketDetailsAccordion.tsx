import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";
import { ITicketDetailsAccordionProps } from "./interfaces/ITicketDetails";
import { useGetUsersQuery } from "../../../Auth/features/usersApiSlice";
import moment from "moment";
import Avatar from "../../../Avatar/components/Avatar";

const TicketDetailsAccordion = ({ ticket }: ITicketDetailsAccordionProps) => {
  const { user } = useGetUsersQuery("userList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[ticket?.user!],
    }),
  });
  const [detailsOpen, setDetailsOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setDetailsOpen(!detailsOpen)}
        className={`mt-12 flex items-center justify-between cursor-pointer hover:bg-gray-100 transition-all duration-200 py-3 border ${
          detailsOpen ? "rounded-t-lg border-b-0" : "rounded-lg"
        }`}
      >
        <p className='text-sm font-medium pl-3'>Details</p>
        <div className='text-xs text-gray-text ml-1.5'>
          {!detailsOpen ? "Reporter, Date" : ""}
        </div>
        <div className='mr-3 ml-auto'>
          {!detailsOpen ? (
            <ChevronDownIcon className='w-5 h-5' />
          ) : (
            <ChevronUpIcon className='w-5 h-5' />
          )}
        </div>
      </div>

      {detailsOpen && (
        <div className='border rounded-b-lg pb-4'>
          <div className='flex flex-col justify-center pl-5 mt-5'>
            <p className='text-xs text-gray-text mb-1'>Reporter</p>

            <div className='flex items-center'>
              <Avatar
                image={user?.image}
                name={user?.name}
                classNames='h-5 w-5 text-sm'
              />
              <p className='ml-1 text-xs'>{user?.name}</p>
            </div>
          </div>
          <div className='flex flex-col justify-center mt-5 pl-5'>
            <p className='text-xs text-gray-text'>Created</p>
            <p className='text-xs'>
              {moment(ticket?.createdAt).format("MMMM Do YYYY, h:mm a")}
            </p>
          </div>

          {ticket?.createdAt !== ticket?.updatedAt ? (
            <div className='flex flex-col justify-center mt-2 pl-5'>
              <p className='text-xs text-gray-text'>Updated</p>
              <p className='text-xs'>
                {moment(moment(ticket?.updatedAt).local().format()).fromNow()}
              </p>
            </div>
          ) : null}
        </div>
      )}
    </>
  );
};

export default TicketDetailsAccordion;
