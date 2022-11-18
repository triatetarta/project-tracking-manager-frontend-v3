import { useAppSelector } from "../app/hooks";
import { selectCurrentToken } from "../Auth/features/authSlice";
import jwtDecode from "jwt-decode";

interface IUserInfo {
  [x: string]: {
    email: string;
    roles: string[];
    id: string;
    image: string;
    name: string;
  };
}

const useAuth = () => {
  const token = useAppSelector(selectCurrentToken);

  let isManager = false;
  let isAdmin = false;
  let status = "Employee";

  if (token) {
    const decoded = jwtDecode(token) as IUserInfo;
    const { email, roles, id, image, name } = decoded.UserInfo;

    isManager = roles.includes("Manager");
    isAdmin = roles.includes("Admin");

    if (isManager) status = "Manager";
    if (isAdmin) status = "Admin";

    return { email, roles, status, isAdmin, isManager, id, image, name };
  }

  return {
    email: "",
    roles: [],
    id: "",
    image: "",
    name: "",
    isAdmin,
    isManager,
    status,
  };
};

export default useAuth;