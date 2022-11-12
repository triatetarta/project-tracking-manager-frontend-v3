import { useGetUsersQuery } from "../features/usersApiSlice";
import User from "./User";

const UserList = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery();

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      {users?.ids?.length
        ? users?.ids.map((id) => {
            return <User key={id} id={id} />;
          })
        : null}
    </>
  );
};

export default UserList;
