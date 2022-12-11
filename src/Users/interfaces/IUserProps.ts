import { EntityId } from "@reduxjs/toolkit";

export interface IUserProps {
  userId: EntityId;
  filteredTickets: number | undefined;
  index: number;
}
