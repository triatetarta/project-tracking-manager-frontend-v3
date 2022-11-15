import { EntityId } from "@reduxjs/toolkit";
import { ChangeEvent } from "react";
import { IDisabled } from "../../Tickets/interfaces/IDisabled";

export interface ISelectAreaField extends IDisabled {
  id: string;
  htmlFor: string;
  name?: string;
  label?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  items?: EntityId[] | string[];
  selectClassNames?: string;
  spanClassNames?: string;
  optionClassNames?: string;
}
