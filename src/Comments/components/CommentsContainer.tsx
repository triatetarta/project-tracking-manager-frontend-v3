import { useEffect } from "react";
import { useGetCommentsQuery } from "../features/commentsApiSlice";
import { ICommentsContainerProps } from "../interfaces/ICommentsContainer";
import Comment from "./Comment";
import toast from "react-hot-toast";

const CommentsContainer = ({
  ticketId,
  getModalType,
}: ICommentsContainerProps) => {
  const {
    data: comments,
    isError,
    error,
  } = useGetCommentsQuery(ticketId, {
    pollingInterval: 60000,
  });

  useEffect(() => {
    if (!isError || error === undefined) return;

    if ("data" in error) {
      toast.error(`${error.status} ${JSON.stringify(error.data)}`);
    }
  }, [isError, error]);

  return (
    <div className='mt-10 flex flex-col space-y-5'>
      {comments?.ids.map((commentId) => {
        return (
          <Comment
            key={commentId}
            commentId={commentId}
            ticketId={ticketId}
            getModalType={getModalType}
          />
        );
      })}
    </div>
  );
};

export default CommentsContainer;
