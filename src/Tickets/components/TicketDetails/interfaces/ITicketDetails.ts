import { StateBooleanType } from "../../../../types/stateTypes";
import { ITicket } from "../../../interfaces/ITicket";

export interface ITicketDetailsHeaderProps {
  id: string;
  ticketUserId: string | undefined;
  setOpenTicketDetails: StateBooleanType;
}

export interface ITicketDetailsInfoProps {
  id: string;
  ticket: ITicket | undefined;
}

export interface ITicketDetailsAccordionProps {
  ticket?: ITicket | undefined;
}
