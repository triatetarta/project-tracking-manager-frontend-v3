import { useAppSelector } from "../../app/hooks";
import { selectUserById } from "../features/usersApiSlice";

interface UserProps {
  id: string | number;
}

const User = ({ id = "10548399" }: UserProps) => {
  const user = useAppSelector((state) => selectUserById(state, id));

  if (!user) return null;

  return <div>{user.roles.toString().replaceAll(",", ", ")}</div>;
};

export default User;
