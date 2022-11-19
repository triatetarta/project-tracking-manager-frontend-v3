import { useState } from "react";
import { useGetUsersQuery } from "../../Auth/features/usersApiSlice";
import Avatar from "../../Avatar/components/Avatar";
import { IUserProps } from "../interfaces/IUserProps";
import { motion, AnimatePresence } from "framer-motion";

const User = ({ userId, filteredTickets, index }: IUserProps) => {
  const { user } = useGetUsersQuery("userList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[userId],
    }),
  });

  const [nameHover, setNameHover] = useState(false);
  const [indexHover, setIndexHover] = useState<number | null>(null);

  return (
    <motion.div
      onMouseEnter={() => {
        setNameHover(true);
        setIndexHover(index);
      }}
      onMouseLeave={() => {
        setNameHover(false);
        setIndexHover(null);
      }}
      className='flex items-center relative mb-1 mr-1'
    >
      <Avatar
        image={user?.image}
        name={user?.name}
        classNames='h-6 w-6 text-sm'
      />

      <AnimatePresence>
        {nameHover && index === indexHover && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className='absolute -top-[4.75rem] -left-1/2 whitespace-nowrap text-xs transform -translate-x-1/1 bg-header-main text-white font-normal px-1.5 py-0.5 rounded-md z-40  shadow-sm'
          >
            <div className='flex flex-col p-1.5'>
              <p className='text-sm'>{user?.name}</p>
              <p className='text-gray-300 text-[0.65rem]'>{user?.email}</p>
              <p className='pt-1'>
                {filteredTickets !== undefined ? (
                  <>
                    {filteredTickets !== 0 ? (
                      <span>{filteredTickets}</span>
                    ) : null}
                    <span className={`${filteredTickets !== 0 ? "ml-1" : ""}`}>
                      {filteredTickets > 1 ? "tickets created" : ""}
                      {filteredTickets === 1 ? "ticket created" : ""}
                      {filteredTickets === 0 && `${user?.name} has no tickets`}
                    </span>
                  </>
                ) : null}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default User;
