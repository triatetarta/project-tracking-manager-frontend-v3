import { useState } from "react";
import { useGetUsersQuery } from "../../Auth/features/usersApiSlice";
import { useGetTicketsQuery } from "../../Tickets/features/ticketsApiSlice";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/solid";
import User from "../../Users/components/User";

const PeopleContainer = () => {
  const { data: users } = useGetUsersQuery("userList");
  const { data: tickets } = useGetTicketsQuery("ticketList");

  const [showPeople, setShowPeple] = useState(true);

  return (
    <div className='px-3 mt-10'>
      <h3
        onClick={() => setShowPeple(!showPeople)}
        className='uppercase text-xs font-bold mb-2 inline-flex items-center cursor-pointer select-none'
      >
        {showPeople ? (
          <ChevronDownIcon className='w-4 h-4' />
        ) : (
          <ChevronRightIcon className='w-4 h-4' />
        )}
        People
      </h3>

      {showPeople ? (
        <div className='flex items-center flex-wrap mt-2 w-full'>
          {users?.ids.map((userId, index) => {
            const filteredTickets = tickets?.ids
              .filter((ticketId) => tickets.entities[ticketId]?.user === userId)
              .map((ticket) => {
                return tickets?.entities[ticket];
              }).length;

            return (
              <User
                index={index}
                key={userId}
                userId={userId}
                filteredTickets={filteredTickets}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default PeopleContainer;
