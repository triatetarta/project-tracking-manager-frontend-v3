import { FC, ReactElement } from "react";
import { useGetUsersQuery } from "../features/usersApiSlice";

const UserList: FC = (): ReactElement => {
  const { data, isLoading, isSuccess, isError, error } = useGetUsersQuery();

  return <div>UserList</div>;
};

export default UserList;
