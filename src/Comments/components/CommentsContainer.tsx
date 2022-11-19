import { useGetCommentsQuery } from "../features/commentsApiSlice";
import { ICommentsContainerProps } from "../interfaces/ICommentsContainer";
import Comment from "./Comment";

const CommentsContainer = ({
  ticketId,
  getModalType,
}: ICommentsContainerProps) => {
  const { data: comments } = useGetCommentsQuery(ticketId, {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

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
