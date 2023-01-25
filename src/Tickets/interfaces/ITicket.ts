import { EntityId } from "@reduxjs/toolkit";

export interface ITicket {
  id?: string;
  _id: string;
  user: string;
  title: string;
  project: string;
  description: string;
  status: string;
  numOfComments: number;
  assignee: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITicketProps {
  category?: string;
  ticketId: EntityId;
  account?: boolean;
}
