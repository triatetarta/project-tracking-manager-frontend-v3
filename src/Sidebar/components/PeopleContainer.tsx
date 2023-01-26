import { useState } from "react";
import { useGetUsersQuery } from "../../Auth/features/usersApiSlice";
import { useGetTicketsQuery } from "../../Tickets/features/ticketsApiSlice";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/solid";
import User from "../../Users/components/User";
import Skeleton from "../../Skeletons/components/Skeleton";

const PeopleContainer = () => {
  const { data: users, isLoading: isUsersLoading } =
    useGetUsersQuery("userList");
  const { data: tickets } = useGetTicketsQuery("ticketList");

  const [showPeople, setShowPeple] = useState(true);

  return (
    <div className='px-1 lg:px-4 mt-10'>
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

      {isUsersLoading ? (
        <>
          {showPeople ? (
            <Skeleton
              elements={8}
              midClassNames='h-6 w-6 rounded-full mb-1 mr-1 relative overflow-hidden'
              outerClassNames='ticket relative flex items-center flex-wrap w-full h-14 overflow-hidden'
              skeletonClassNames='w-full h-full'
            />
          ) : null}
        </>
      ) : (
        <>
          {showPeople ? (
            <div className='flex items-center flex-wrap mt-2 w-full'>
              {users?.ids.map((userId, index) => {
                const filteredTickets = tickets?.ids
                  .filter(
                    (ticketId) => tickets.entities[ticketId]?.user === userId
                  )
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
        </>
      )}
    </div>
  );
};

export default PeopleContainer;
