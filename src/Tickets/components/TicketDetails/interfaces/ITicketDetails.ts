import { EntityId } from "@reduxjs/toolkit";
import { TGetModalTypeFunc } from "../../../../Dashboard/interfaces/IModalType";
import { ITicket } from "../../../interfaces/ITicket";

export interface ITicketDetailsHeaderProps {
  id: string;
  ticketUserId: string | undefined;
  ticketId: EntityId;
  getModalType: TGetModalTypeFunc;
  category: string | undefined;
}

export interface ITicketDetailsInfoProps {
  id: string;
  ticket: ITicket | undefined;
  category: string | undefined;
}

export interface ITicketDetailsAccordionProps {
  ticket?: ITicket | undefined;
}
