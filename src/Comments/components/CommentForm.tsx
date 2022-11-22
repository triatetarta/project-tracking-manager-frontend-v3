import { MouseEvent, useState } from "react";
import { useGetUsersQuery } from "../../Auth/features/usersApiSlice";
import Avatar from "../../Avatar/components/Avatar";
import Button from "../../Button/components/Button";
import TextAreaField from "../../FormFields/components/TextAreaField";
import useAuth from "../../hooks/useAuth";
import { useAddNewCommentMutation } from "../features/commentsApiSlice";
import { ICommentFormProps } from "../interfaces/ICommentForm";

const CommentForm = ({ ticketId }: ICommentFormProps) => {
  const { id } = useAuth();
  const { user } = useGetUsersQuery("userList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[id],
    }),
  });
  const [addNewComment] = useAddNewCommentMutation();

  const [text, setText] = useState("");

  const onCommentSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    await addNewComment({
      user: id,
      ticket: ticketId,
      text,
    });

    setText("");
  };

  return (
    <>
      <div className='flex items-center space-x-2 w-full'>
        <div className='h-10 w-10 mb-2'>
          <Avatar
            image={user?.image}
            name={user?.name}
            classNames='h-10 w-10 text-base'
          />
        </div>

        <form className='w-full flex items-center mt-1'>
          <TextAreaField
            classNames='rounded-lg border w-full py-2 px-3 focus:outline-1 outline-deep-blue text-sm hover:border-gray-400 transition-all duration-150'
            rows={2}
            name='text'
            id='text'
            placeholder='Add a comment...'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </form>
      </div>
      {text.length > 1 && (
        <div className='flex mt-1 ml-2'>
          <Button
            classNames='bg-deep-blue text-white py-1 px-2 rounded-md hover:bg-light-blue transition-all duration-100 text-sm ml-11 font-semibold'
            onClick={onCommentSubmit}
            text='Add'
          />
        </div>
      )}
    </>
  );
};

export default CommentForm;
