import { motion } from "framer-motion";
import { ExclamationIcon } from "@heroicons/react/solid";
import { IModalProps } from "../interfaces/IModal";
import { useAppDispatch } from "../../app/hooks";
import { setModalClose } from "../features/modalSlice";
import { useDeleteTicketMutation } from "../../Tickets/features/ticketsApiSlice";
import { MouseEvent, useEffect } from "react";
import Button from "../../Button/components/Button";
import { useDeleteCommentMutation } from "../../Comments/features/commentsApiSlice";
import toast from "react-hot-toast";
import { setTicketDetailsClose } from "../../Tickets/features/ticketsSlice";

const Modal = ({ type, id }: IModalProps) => {
  const [deleteTicket, { isSuccess: isDeleteTicketSuccess }] =
    useDeleteTicketMutation();
  const [deleteComment] = useDeleteCommentMutation();

  const dispatch = useAppDispatch();

  const onDelete = async () => {
    if (type === "ticket") {
      await deleteTicket({
        id,
      });
      dispatch(setModalClose());
    } else if (type === "comment") {
      await deleteComment({
        id,
      });
      dispatch(setModalClose());
    }

    return;
  };

  const onCancel = () => {
    dispatch(setModalClose());
  };

  const onBackgroundClick = (
    e: MouseEvent<HTMLDivElement> & { target: HTMLDivElement }
  ) => {
    e.stopPropagation();
    if (e.target.classList.contains("modalBackdrop")) {
      dispatch(setModalClose());
    }
  };

  useEffect(() => {
    if (!isDeleteTicketSuccess) return;

    toast.success("Ticket has been deleted");
    dispatch(setModalClose());
    dispatch(setTicketDetailsClose());
  }, [isDeleteTicketSuccess]);

  return (
    <motion.section
      onClick={onBackgroundClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1 }}
      className='fixed top-0 right-0 left-0 bottom-0 w-full h-full bg-black/20  backdrop-blur-sm z-50 modalBackdrop'
    >
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className='container mx-auto flex justify-center'
      >
        <div className='bg-white rounded-md shadow-sm w-[400px] p-6 mt-24'>
          <div className='flex items-center'>
            <span className='mr-3'>
              <ExclamationIcon className='w-6 h-6 text-red-text' />
            </span>
            <span className='text-xl font-medium'>
              Delete
              {type === "comment" ? " comment ?" : ` ticket ?`}
            </span>
          </div>

          <br />
          <p className='text-sm'>
            You're about to permanently delete{" "}
            {type === "comment"
              ? "this comment."
              : "this ticket, its comments and all of its data."}
            <br />
            <br />
            If you're not sure, you can resolve or close this issue instead.
          </p>

          <br />
          <div className='flex justify-end space-x-2 text-sm'>
            <Button
              onClick={onDelete}
              classNames='bg-red-text hover:bg-red-text-light text-white px-3 py-2 rounded-md transition-all duration-200'
              text='Delete'
            />

            <Button
              onClick={onCancel}
              classNames='px-3 py-2 rounded-md text-gray-text hover:bg-gray-100 transition-all duration-200'
              text='Cancel'
            />
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Modal;
