import { motion } from "framer-motion";
import InputField from "../../FormFields/components/InputField";
import Swatch from "@uiw/react-color-swatch";
import { hsvaToHex } from "@uiw/color-convert";
import toast from "react-hot-toast";
import TextAreaField from "../../FormFields/components/TextAreaField";
import { MouseEvent, useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { INewStatusProps } from "../interfaces/INewStatus";
import { useAddWorkflowStatusMutation } from "../features/workflowsApiSlice";

function Border(props: { color?: string; checked?: boolean }) {
  if (!props.checked) return null;
  return (
    <div
      style={{
        border: "1px solid #FAFBFC",
        width: "100%",
        height: "100%",
        borderRadius: "2px",
      }}
    />
  );
}

const NewStatus = ({ setOpenAddStatus }: INewStatusProps) => {
  const { id, name } = useAuth();
  const [addNewStatus, { isSuccess }] = useAddWorkflowStatusMutation();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [hex, setHex] = useState("");

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
      color: hex,
    });
  };

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

            <div className='ml-1'>
              <p className='text-left block mb-1 text-xs text-gray-text'>
                Status color
                {hex === "" ? (
                  <span className='text-red-text ml-0.5'>*</span>
                ) : null}
              </p>
              <Swatch
                colors={["#2074e3", "#f6b73e", "#11a865"]}
                color={hex}
                rectProps={{
                  children: <Border />,
                }}
                onChange={(hsvColor) => {
                  setHex(hsvaToHex(hsvColor));
                }}
              />
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
