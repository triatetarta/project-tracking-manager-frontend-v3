export interface IWorkflowStatus {
  id?: string;
  _id: string;
  user: string;
  title: string;
  description: string;
  category: "to do" | "in progress" | "closed";
  createdAt: Date;
  updatedAt: Date;
}
