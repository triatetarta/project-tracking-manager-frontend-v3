import { EntityId } from "@reduxjs/toolkit";

export interface IProject {
  id?: string;
  _id: string;
  user: string;
  title: string;
  description: string;
  status: "open" | "closed";
  createdAt: Date;
  updatedAt: Date;
  color: string;
}

export interface IProjectProps {
  projectId: EntityId;
}
