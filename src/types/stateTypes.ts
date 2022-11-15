import { EntityId } from "@reduxjs/toolkit";
import { Dispatch, SetStateAction } from "react";

export type StateBooleanType = Dispatch<SetStateAction<boolean>>;
export type StateStringType = Dispatch<SetStateAction<string | EntityId>>;
