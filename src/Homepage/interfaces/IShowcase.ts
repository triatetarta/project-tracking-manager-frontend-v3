import { StateBooleanType, StateOnlyStringType } from "../../types/stateTypes";

export interface IShowcase {
  setOpenModal: StateBooleanType;
  setModalType: StateOnlyStringType;
}
