import { EntityId } from "@reduxjs/toolkit";
import { StateBooleanType } from "../../types/stateTypes";

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
  setHasTickets?: StateBooleanType;
}
