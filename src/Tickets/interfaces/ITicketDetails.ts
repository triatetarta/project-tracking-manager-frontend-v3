import { EntityId } from "@reduxjs/toolkit";
import { StateBooleanType } from "../../types/stateTypes";

export interface ITicketDetailsProps {
  ticketId: string | EntityId;
  setOpenTicketDetails: StateBooleanType;
}
