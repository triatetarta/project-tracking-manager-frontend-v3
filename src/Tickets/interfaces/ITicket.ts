import { EntityId } from "@reduxjs/toolkit";
import { StateBooleanType } from "../../types/stateTypes";

export interface ITicket {
  id?: string;
  _id: string;
  user: string;
  title: string;
  project: string;
  description: string;
  status: "to do" | "in progress" | "closed";
  numOfComments: number;
  assignee: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITicketProps {
  ticketId: EntityId;
  hoverClassNames?: string;
  account?: boolean;
  setHasTickets?: StateBooleanType;
}
