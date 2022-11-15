import { EntityId } from "@reduxjs/toolkit";

export interface IOption {
  item: EntityId | string;
  name?: string;
  optionClassNames?: string;
}
