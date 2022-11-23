import { EntityId, EntityState } from "@reduxjs/toolkit";
import { ITicket } from "../../Tickets/interfaces/ITicket";
import { StateBooleanType } from "../../types/stateTypes";

export interface IStatusCardProps {
  tickets?: EntityState<ITicket> | undefined;
  setCreateNewTicket?: StateBooleanType;
  classNames?: string;
  workflow?: boolean;
  statusId?: EntityId;
}
