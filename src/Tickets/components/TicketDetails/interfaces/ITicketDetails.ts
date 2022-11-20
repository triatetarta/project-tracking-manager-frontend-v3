import { EntityId } from "@reduxjs/toolkit";
import { TGetModalTypeFunc } from "../../../../Dashboard/interfaces/IModalType";
import { StateBooleanType } from "../../../../types/stateTypes";
import { ITicket } from "../../../interfaces/ITicket";

export interface ITicketDetailsHeaderProps {
  id: string;
  ticketUserId: string | undefined;
  ticketId: EntityId;
  setOpenTicketDetails: StateBooleanType;
  getModalType: TGetModalTypeFunc;
  getStatusStyles: () =>
    | {
        background: string;
        text: string;
      }
    | undefined;
}

export interface ITicketDetailsInfoProps {
  id: string;
  ticket: ITicket | undefined;
  getStatusStyles: () =>
    | {
        background: string;
        text: string;
      }
    | undefined;
}

export interface ITicketDetailsAccordionProps {
  ticket?: ITicket | undefined;
}
