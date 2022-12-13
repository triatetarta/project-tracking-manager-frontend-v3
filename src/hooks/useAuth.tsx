import { useAppSelector } from "../app/hooks";
import { selectCurrentToken } from "../Auth/features/authSlice";
import jwtDecode from "jwt-decode";

interface IUserInfo {
  email: string;
  id: string;
  image: string;
  name: string;
  roles: string[];
}

interface IDecoded {
  UserInfo: IUserInfo;
  exp: number;
  iat: number;
}

const useAuth = () => {
  const token = useAppSelector(selectCurrentToken);

  let isManager = false;
  let isAdmin = false;
  let status = "Employee";
  let loggedIn = false;

  if (token) {
    const decoded = jwtDecode(token) as IDecoded;
    const { roles, id } = decoded.UserInfo;

    isManager = roles.includes("Manager");
    isAdmin = roles.includes("Admin");

    if (isManager) status = "Manager";
    if (isAdmin) status = "Admin";
    if (decoded.UserInfo) loggedIn = true;

    return {
      roles,
      status,
      isAdmin,
      isManager,
      id,
      loggedIn,
    };
  }

  return {
    roles: [],
    id: "",
    isAdmin,
    isManager,
    status,
    loggedIn,
  };
};

export default useAuth;
