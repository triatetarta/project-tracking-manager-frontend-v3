import { ICommentsProps } from "../interfaces/IComments";
import CommentForm from "./CommentForm";
import CommentsContainer from "./CommentsContainer";

const Comments = ({ ticketId, getModalType }: ICommentsProps) => {
  return (
    <div className='mt-10 pl-3'>
      <p className='text-sm font-medium mb-3'>Comments</p>

      <CommentForm ticketId={ticketId} />

      <CommentsContainer ticketId={ticketId} getModalType={getModalType} />
    </div>
  );
};

export default Comments;
