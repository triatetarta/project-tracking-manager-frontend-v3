import { MouseEvent } from "react";
import { StateBooleanType } from "../../types/stateTypes";

export interface INavbarProps {
  openAccountMenu: boolean;
  setOpenAccountMenu: StateBooleanType;
  closeOpenMenus: (
    e: MouseEvent<HTMLDivElement> | MouseEvent<HTMLElement>
  ) => void;
}
