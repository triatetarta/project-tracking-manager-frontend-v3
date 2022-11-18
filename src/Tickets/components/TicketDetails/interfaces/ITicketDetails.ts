import { EntityId } from "@reduxjs/toolkit";
import { TGetModalType } from "../../../../Dashboard/interfaces/IModalType";
import { StateBooleanType } from "../../../../types/stateTypes";
import { ITicket } from "../../../interfaces/ITicket";

export interface ITicketDetailsHeaderProps {
  id: string;
  ticketUserId: string | undefined;
  ticketId: EntityId;
  setOpenTicketDetails: StateBooleanType;
  getModalType: (type: TGetModalType) => void;
}

export interface ITicketDetailsInfoProps {
  id: string;
  ticket: ITicket | undefined;
}

export interface ITicketDetailsAccordionProps {
  ticket?: ITicket | undefined;
}
