import { EntityState } from "@reduxjs/toolkit";
import { StateBooleanType } from "../../types/stateTypes";
import { ITicket } from "./ITicket";

export interface ITicketsContainer {
  tickets: EntityState<ITicket> | undefined;
  category: string;
  icon: JSX.Element;
  setCreateNewTicket: StateBooleanType;
}
