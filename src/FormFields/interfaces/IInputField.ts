import { ChangeEvent } from "react";
import { IDisabled } from "../../Tickets/interfaces/IDisabled";
import { ClassNames } from "../../types/generalTypes";

export interface IInputField extends IDisabled {
  id?: string;
  htmlFor?: string;
  label: string;
  name?: string;
  type: string;
  placeholder?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  classNames?: ClassNames;
  focus?: boolean;
}
