export interface IWorkflowStatus {
  id?: string;
  _id: string;
  user: string;
  title: string;
  description: string;
  color: "#2074e3" | "#f6b73e" | "#11a865";
  createdAt: Date;
  updatedAt: Date;
}
