import { EntityId } from "@reduxjs/toolkit";
import { TGetModalTypeFunc } from "../../Dashboard/interfaces/IModalType";

export interface ICommentsContainerProps {
  ticketId: EntityId;
  getModalType: TGetModalTypeFunc;
}
