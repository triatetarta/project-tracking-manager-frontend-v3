import { motion } from "framer-motion";
import React, { useState } from "react";
import { INewTicket } from "../interfaces/INewTicket";
import { useNavigate } from "react-router-dom";
import InputField from "../../FormFields/components/InputField";
import TextAreaField from "../../FormFields/components/TextAreaField";
import { useAddNewTicketMutation } from "../features/ticketsApiSlice";
import SelectField from "../../FormFields/components/SelectField";
import { useGetProjectsQuery } from "../../Projects/features/projectsApiSlice";
import CreateProjectButton from "../../Projects/components/CreateProjectButton";

const NewTicket = ({ setCreateNewTicket, setCreateNewProject }: INewTicket) => {
  const [addNewTicket, { isLoading, isSuccess, isError, error }] =
    useAddNewTicketMutation();
  const { data: projects } = useGetProjectsQuery();

  const [reportersName] = useState("");
  const [reportersEmail] = useState("");
  const [title, setTitle] = useState("");
  const [project, setProject] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const cancelCreateTicket = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCreateNewTicket(false);
    setProject("");
    setDescription("");
  };

  const createTicketSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await addNewTicket({
      user: "636c093ed4ef74a28f721ecc",
      title: "Remix App",
      project: "Remix",
      description: "yo testing the fields",
      status: "to do",
    });
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
              value={reportersName}
              disabled
              focus={false}
            />
            <InputField
              label='Reporter`s Email'
              htmlFor='email'
              type='email'
              value={reportersEmail}
              disabled
              focus={false}
            />
            <InputField
              id='title'
              label='Title'
              htmlFor='title'
              name='title'
              type='text'
              value={title}
              placeholder='Enter a title'
              focus
              onChange={(e) => setTitle(e.target.value as string)}
            />
          </div>

          <form>
            <div className='mb-3'>
              <div className='flex justify-between items-center relative'>
                {!projects?.ids.length ? (
                  <p className='text-xs p-2 mb-3'>No projects available</p>
                ) : (
                  <SelectField
                    label='Project'
                    name='project'
                    htmlFor='project'
                    id='project'
                    onChange={(e) => {
                      console.log(e.target.value);
                      setProject(e.target.value);
                    }}
                    value={project}
                    items={projects.ids}
                  />
                )}

                <div className='flex items-center mt-1'>
                  <CreateProjectButton
                    setCreateNewProject={setCreateNewProject}
                  />
                </div>
              </div>
            </div>
            <div className='mb-3'>
              <TextAreaField
                disabled={false}
                id='description'
                name='description'
                rows={10}
                value={description}
                label='Description'
                placeholder='Enter a description'
                onChange={(e) => setDescription(e.target.value as string)}
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
                  disabled={
                    title === "" || project === "" || description === ""
                  }
                  onClick={createTicketSubmit}
                  className='bg-deep-blue text-white py-2 px-3 rounded-md w-full hover:bg-light-blue transition-all duration-100 text-sm disabled:bg-gray-text/80 hover:disabled:bg-gray-text/80'
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
