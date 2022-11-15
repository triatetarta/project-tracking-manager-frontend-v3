import { EntityId } from "@reduxjs/toolkit";
import { StateBooleanType } from "../../types/stateTypes";

export interface ITickets {
  setCreateNewTicket: StateBooleanType;
  openTicketDetailsHandler: (id: EntityId) => void;
}
