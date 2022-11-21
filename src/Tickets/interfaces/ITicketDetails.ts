import { EntityId } from "@reduxjs/toolkit";
import { TGetModalTypeFunc } from "../../Dashboard/interfaces/IModalType";
import { StateBooleanType } from "../../types/stateTypes";

export interface ITicketDetailsProps {
  getModalType: TGetModalTypeFunc;
}
