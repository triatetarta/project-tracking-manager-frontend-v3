import { motion } from "framer-motion";
import React, { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { INewTicket } from "../interfaces/INewTicket";
import { useNavigate } from "react-router-dom";
import InputField from "../../InputFields/components/InputField";
import TextAreaField from "../../InputFields/components/TextAreaField";

const NewTicket = ({ setCreateNew }: INewTicket) => {
  const [name] = useState("");
  const [email] = useState("");
  const [project, setProject] = useState("");
  const [projectNames, setProjectNames] = useState([]);
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const cancelCreateTicket = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCreateNew(false);
    setProject("");
    setDescription("");
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1 }}
      className='fixed top-0 right-0 left-0 bottom-0 w-full h-full bg-black/20  backdrop-blur-sm z-40'
    >
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className='container mx-auto flex justify-center'
      >
        <div className='bg-white rounded-md shadow-sm w-[400px] p-6 mt-24'>
          <h3 className='text-center text-lg font-semibold mb-5'>
            Create Ticket
          </h3>

          <div>
            <InputField
              label='Reporter'
              htmlFor='name'
              type='text'
              value={name}
              disabled
              focus={false}
            />
            <InputField
              label='Reporter`s Email'
              htmlFor='email'
              type='email'
              value={email}
              disabled
              focus={false}
            />
          </div>

          <form>
            <div className='mb-3'>
              <label
                className='text-left block mb-1 ml-1 text-xs text-gray-text'
                htmlFor='project'
              >
                Project
                {!project && <span className='text-red-text ml-0.5'>*</span>}
              </label>
              <div className='flex items-center justify-between relative'>
                {/* {!projects.length ? (
                  <p className='text-xs p-2 mb-3'>No projects available</p>
                ) : (
                  <div className='relative'>
                    <span className='w-4 h-4 absolute right-2 top-3 z-50 pointer-events-none text-gray-text'>
                      <ChevronDownIcon />
                    </span>
                    <select
                      className='py-2 pl-2 pr-6 border rounded-md mb-3 text-sm hover:bg-gray-100
        transition-all duration-200 cursor-pointer focus:outline-1 outline-deep-blue capitalize appearance-none'
                      name='project'
                      id='project'
                      value={project}
                      onChange={(e) => setProject(e.target.value)}
                    >
                      {projectNames?.map((project, index) => {
                        return (
                          <option key={index} value={project}>
                            {project}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                )} */}

                <div className='flex items-center mb-3'>
                  {/* <CreateProject /> */}
                </div>
              </div>
            </div>
            <div className='mb-3'>
              <TextAreaField
                id='description'
                name='description'
                rows={10}
                value={description}
                label='Description'
                placeholder='Enter a description'
                onChange={(e) => setDescription(e.target.value as string)}
                focus
              />
            </div>
            <div className='mb-3 flex justify-between'>
              <div className='flex-grow mr-auto' />
              <div className='flex space-x-2'>
                <button
                  onClick={cancelCreateTicket}
                  className='text-gray-text py-2 px-3 rounded-md w-full hover:underline hover:text-gray-text/75 transition-all duration-100 text-sm'
                >
                  Cancel
                </button>
                <button
                  //   onClick={createTicketSubmit}
                  className='bg-deep-blue text-white py-2 px-3 rounded-md w-full hover:bg-light-blue transition-all duration-100 text-sm'
                >
                  Create
                </button>
              </div>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default NewTicket;
