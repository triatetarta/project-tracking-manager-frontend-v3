import { EntityId } from "@reduxjs/toolkit";
import { TGetModalType } from "../../Dashboard/interfaces/IModalType";

export interface IModalProps {
  type?: TGetModalType;
  id?: EntityId;
}
