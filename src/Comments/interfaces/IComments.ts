import { EntityId } from "@reduxjs/toolkit";
import { TGetModalTypeFunc } from "../../Dashboard/interfaces/IModalType";

export interface ICommentsProps {
  ticketId: EntityId;
  getModalType: TGetModalTypeFunc;
}
