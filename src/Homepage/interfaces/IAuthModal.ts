import { StateBooleanType, StateOnlyStringType } from "../../types/stateTypes";

export interface IAuthModalProps {
  setOpenModal: StateBooleanType;
  modalType: string;
  setModalType: StateOnlyStringType;
}
