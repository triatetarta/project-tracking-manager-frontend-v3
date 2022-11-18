import { EntityId } from "@reduxjs/toolkit";
import { TGetModalType } from "../../Dashboard/interfaces/IModalType";
import { StateBooleanType } from "../../types/stateTypes";

export interface ITicketDetailsProps {
  ticketId: string | EntityId;
  setOpenTicketDetails: StateBooleanType;
  getModalType: (type: TGetModalType) => void;
}
