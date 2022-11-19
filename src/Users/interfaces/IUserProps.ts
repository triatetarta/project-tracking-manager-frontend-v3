import { EntityId } from "@reduxjs/toolkit";
import { ITicket } from "../../Tickets/interfaces/ITicket";

export interface IUserProps {
  userId: EntityId;
  filteredTickets: number | undefined;
  index: number;
}
