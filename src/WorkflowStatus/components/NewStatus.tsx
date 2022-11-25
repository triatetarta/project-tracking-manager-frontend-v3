import { motion } from "framer-motion";
import InputField from "../../FormFields/components/InputField";
import toast from "react-hot-toast";
import TextAreaField from "../../FormFields/components/TextAreaField";
import { MouseEvent, useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { INewStatusProps } from "../interfaces/INewStatus";
import {
  useAddWorkflowStatusMutation,
  useGetWorkflowStatusQuery,
} from "../features/workflowsApiSlice";
import SelectField from "../../FormFields/components/SelectField";

const NewStatus = ({ setOpenAddStatus }: INewStatusProps) => {
  const { id, name } = useAuth();
  const [addNewStatus, { isSuccess }] = useAddWorkflowStatusMutation();

  const { data: workflowStatus } =
    useGetWorkflowStatusQuery("workflowStatusList");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<string | undefined>("");

  const onCancel = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setOpenAddStatus(false);
  };

  const onSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await addNewStatus({
      user: id,
      title: title.toLowerCase(),
      description: description.toLowerCase(),
      category: category,
    });
  };

  useEffect(() => {
    if (workflowStatus === undefined) return;

    const defaultStatus = workflowStatus.entities[workflowStatus.ids[0]]?._id;

    setCategory(defaultStatus);
  }, [workflowStatus]);

  useEffect(() => {
    if (!isSuccess) return;

    toast.success("Status has been added");
    setOpenAddStatus(false);
  }, [isSuccess]);

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
        <div className='bg-pale-bg rounded-md shadow-sm w-[400px] p-6 mt-24'>
          <h3 className='text-center text-lg font-semibold mb-5'>
            Add a Status
          </h3>
          <form>
            <InputField
              label='Creator'
              htmlFor='name'
              type='text'
              value={name}
              disabled
              focus={false}
              containerClasses='mb-3'
            />

            <InputField
              id='title'
              label='Status Title'
              placeholder='Enter a title for that status'
              value={title}
              name='title'
              htmlFor='title'
              type='text'
              onChange={(e) => setTitle(e.target.value as string)}
              focus
              containerClasses='mb-3'
            />

            <TextAreaField
              label='Description'
              disabled={false}
              id='description'
              name='description'
              rows={2}
              value={description}
              placeholder='Enter a description for that status'
              onChange={(e) => setDescription(e.target.value as string)}
            />

            <div className='flex justify-between items-center relative mb-4'>
              <div className='flex flex-col'>
                <SelectField
                  label='Category'
                  htmlFor='status'
                  id='status'
                  name='status'
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                  items={workflowStatus?.ids}
                  spanClassNames={`w-5 h-5 absolute right-2 top-2 z-50 pointer-events-none text-header-main`}
                  selectClassNames={`pl-4 pr-7 py-2 rounded-lg cursor-pointer transition-all duration-200 font-semibold outline-none text-sm uppercase appearance-none relative border hover:bg-gray-100 transition-all duration-200`}
                  optionClassNames='bg-gray-100 text-header-main uppercase'
                />
              </div>
              <div />
            </div>

            <div className='mb-3 flex justify-between'>
              <div className='flex-grow mr-auto' />
              <div className='flex space-x-2'>
                <button
                  onClick={onCancel}
                  className='text-gray-text py-2 px-3 rounded-md w-full hover:underline hover:text-gray-text/75 transition-all duration-100 text-sm'
                >
                  Cancel
                </button>
                <button
                  disabled={title === "" || description === ""}
                  onClick={onSubmit}
                  className='bg-medium-blue text-white py-2 px-3 rounded-md w-full hover:bg-light-blue transition-all duration-100 text-sm disabled:bg-gray-text/80 hover:disabled:bg-gray-text/80'
                >
                  Add
                </button>
              </div>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default NewStatus;
