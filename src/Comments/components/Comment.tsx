import {
  useGetCommentsQuery,
  useUpdateCommentMutation,
} from "../features/commentsApiSlice";
import { ICommentProps } from "../interfaces/IComment";
import moment from "moment";
import { useGetUsersQuery } from "../../Auth/features/usersApiSlice";
import { useState, useCallback } from "react";
import { convertString } from "../../helpers/firstLetterUppercase";
import TextAreaField from "../../FormFields/components/TextAreaField";
import Button from "../../Button/components/Button";
import { useAppDispatch } from "../../app/hooks";
import { setModalOpen } from "../../Modal/features/modalSlice";
import Avatar from "../../Avatar/components/Avatar";
import useAuth from "../../hooks/useAuth";

const Comment = ({ commentId, ticketId, getModalType }: ICommentProps) => {
  const { id: userId } = useAuth();
  const [updateComment] = useUpdateCommentMutation();
  const { comment } = useGetCommentsQuery(ticketId, {
    selectFromResult: ({ data }) => ({
      comment: data?.entities[commentId],
    }),
  });
  const { user } = useGetUsersQuery("userList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[comment?.user!],
    }),
  });

  const [editEnable, setEditEnable] = useState(false);
  const [editText, setEditText] = useState("");

  const dispatch = useAppDispatch();

  const onEditEnable = useCallback(() => {
    setEditEnable(true);

    if (comment !== undefined) {
      const convertedComment = convertString(comment.text);

      setEditText(convertedComment);
    }
  }, [comment]);

  const onEditCancel = useCallback(() => {
    setEditEnable(false);
    if (comment !== undefined) {
      const convertedComment = convertString(comment.text);

      setEditText(convertedComment);
    }
  }, [comment]);

  const onCommentDeleteButton = () => {
    dispatch(setModalOpen());
    getModalType("comment", commentId);
  };

  const onUpdateComment = async () => {
    await updateComment({
      id: commentId,
      text: editText,
    });

    setEditEnable(false);
  };

  return (
    <div className='flex space-x-2 w-full'>
      <div className='h-9 w-9'>
        <Avatar
          classNames='h-9 w-9 text-base'
          image={user?.image}
          name={user?.name}
        />
      </div>
      <div className='flex flex-col space-y-2 w-full'>
        <div className='flex text-xs'>
          <p className='text-xs font-semibold capitalize'>{user?.name}</p>
          <span className='ml-3 text-gray-text'>
            {comment?.createdAt === comment?.updatedAt ? (
              <span>
                {moment(moment(comment?.createdAt).local().format()).fromNow()}
              </span>
            ) : (
              <>
                <span className='mr-1.5 italic text-gray-text'>edited</span>
                <span className='text-gray-text'>
                  {moment(
                    moment(comment?.updatedAt).local().format()
                  ).fromNow()}
                </span>
              </>
            )}
          </span>
        </div>
        {!editEnable ? (
          <p className='text-sm w-full mb-3'>
            {comment !== undefined && convertString(comment?.text)}
          </p>
        ) : (
          <TextAreaField
            value={editEnable ? editText : comment?.text}
            name='comment'
            disabled={!editEnable}
            classNames='rounded-lg border w-full py-2 px-3 focus:outline-1 outline-deep-blue text-sm hover:border-gray-400 transition-all duration-150'
            rows={2}
            focus
            onChange={(e) => setEditText(e.target.value)}
          />
        )}

        <div>
          {userId === comment?.user ? (
            <div className='flex space-x-1 items-center'>
              {editEnable ? (
                <>
                  <Button
                    classNames='bg-deep-blue text-white py-1 px-2 rounded-md hover:bg-light-blue transition-all duration-100 text-sm mt-0.5'
                    onClick={onUpdateComment}
                    text='Save'
                  />

                  <Button
                    classNames='hover:bg-gray-200 text-gray-text py-1 px-2 rounded-md transition-all duration-100 text-sm mt-0.5'
                    onClick={onEditCancel}
                    text='Cancel'
                  />
                </>
              ) : (
                <>
                  <Button
                    classNames='text-gray-text py-2 rounded-md hover:underline hover:text-gray-text/75 transition-all duration-100 text-xs font-semibold'
                    onClick={onEditEnable}
                    text='Edit'
                  />

                  <span className='text-xs text-gray-text'>•</span>
                  <Button
                    classNames='text-gray-text py-2 rounded-md hover:underline hover:text-gray-text/75 transition-all duration-100 text-xs font-semibold'
                    onClick={onCommentDeleteButton}
                    text='Delete'
                  />
                </>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Comment;
