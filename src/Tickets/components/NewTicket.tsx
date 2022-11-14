import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { INewTicket } from "../interfaces/INewTicket";
import InputField from "../../FormFields/components/InputField";
import TextAreaField from "../../FormFields/components/TextAreaField";
import { useAddNewTicketMutation } from "../features/ticketsApiSlice";
import SelectField from "../../FormFields/components/SelectField";
import { useGetProjectsQuery } from "../../Projects/features/projectsApiSlice";
import { PlusIcon } from "@heroicons/react/outline";
import Button from "../../Button/components/Button";
import useAuth from "../../hooks/useAuth";

const NewTicket = ({ setCreateNewTicket, setCreateNewProject }: INewTicket) => {
  const { id, name, email } = useAuth();
  const [addNewTicket, { isLoading, isSuccess, isError, error, data }] =
    useAddNewTicketMutation();
  const { data: projects } = useGetProjectsQuery("projectList");

  const [reportersName] = useState(name);
  const [reportersEmail] = useState(email);
  const [title, setTitle] = useState("");
  const [project, setProject] = useState<string | undefined>("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (projects === undefined) return;

    const defaultProject = projects.entities[projects.ids[0]]?.title;

    setProject(defaultProject);
  }, [projects]);

  const cancelCreateTicket = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCreateNewTicket(false);
    setProject("");
    setDescription("");
  };

  const createTicketSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await addNewTicket({
      user: id,
      title: title.toLowerCase(),
      project: project?.toLowerCase(),
      description: description.toLowerCase(),
      status: "to do",
    });
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1 }}
      className='fixed top-0 right-0 left-0 bottom-0 w-full h-full bg-black/20  backdrop-blur-sm z-40 text-header-main'
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
              containerClasses='mb-3'
            />
            <InputField
              label='Reporter`s Email'
              htmlFor='email'
              type='email'
              value={reportersEmail}
              disabled
              focus={false}
              containerClasses='mb-3'
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
              containerClasses='mb-3'
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
                      setProject(e.target.value);
                    }}
                    value={project}
                    items={projects.ids}
                  />
                )}

                <div className='flex items-center mt-1'>
                  <Button
                    type='button'
                    onClick={() => setCreateNewProject(true)}
                    classNames='flex items-center justify-center hover:bg-gray-200 px-3 py-3 rounded-lg transition-all duration-200'
                    textClassNames='text-xs font-semibold'
                    icon={<PlusIcon className='w-3 h-3 text-gray-text' />}
                    text='Create Project'
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
                <Button
                  onClick={cancelCreateTicket}
                  classNames='text-gray-text py-2 px-3 rounded-md w-full hover:underline hover:text-gray-text/75 transition-all duration-100 text-sm'
                  textClassNames='text-sm'
                  text='Cancel'
                />

                <Button
                  disabled={
                    title === "" || project === "" || description === ""
                  }
                  classNames='bg-deep-blue text-white py-2 px-3 rounded-md w-full hover:bg-light-blue transition-all duration-100 text-sm disabled:bg-gray-text/80 hover:disabled:bg-gray-text/80'
                  textClassNames='text-sm'
                  text='Create'
                  onClick={(e) => createTicketSubmit(e)}
                />
              </div>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default NewTicket;
