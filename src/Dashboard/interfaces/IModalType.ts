import { EntityId } from "@reduxjs/toolkit";

export type TGetModalType = "ticket" | "comment" | "";

export type TGetModalTypeFunc = (
  type: TGetModalType,
  targetId: string | EntityId
) => void;
