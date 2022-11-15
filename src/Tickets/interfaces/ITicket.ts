import { EntityId } from "@reduxjs/toolkit";

export interface ITicket {
  id?: string;
  _id: string;
  user: string;
  title: string;
  project: string;
  description: string;
  status: "to do" | "in progress" | "closed";
  numOfComments: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITicketProps {
  ticketId: EntityId;
  openTicketDetailsHandler: (id: EntityId) => void;
}
