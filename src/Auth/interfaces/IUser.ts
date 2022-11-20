export interface IUser {
  active: boolean;
  email: string;
  id?: string;
  _id: string;
  image: string;
  location: string;
  name: string;
  jobTitle: string;
  department: string;
  roles: string[];
  team: string;
}
