import { EntityId } from "@reduxjs/toolkit";
import { TGetModalTypeFunc } from "../../Dashboard/interfaces/IModalType";

export interface IComment {
  id?: string;
  _id: string;
  user: string;
  ticket: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICommentProps {
  commentId: EntityId;
  ticketId: EntityId;
  getModalType: TGetModalTypeFunc;
}
