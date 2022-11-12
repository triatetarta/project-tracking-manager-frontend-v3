import { EntityState } from "@reduxjs/toolkit";
import React from "react";
import { ITicket } from "./ITicket";

export interface ITicketsContainer {
  tickets: EntityState<ITicket> | undefined;
  category: string;
  icon: JSX.Element;
  setCreateNew: React.Dispatch<React.SetStateAction<boolean>>;
}
