import { useAppSelector } from "../app/hooks";
import { selectCurrentToken } from "../Auth/features/authSlice";
import { useState } from "react";
import jwtDecode from "jwt-decode";

interface IUserInfo {
  [x: string]: { email: string; roles: string[] };
}

const useAuth = () => {
  const token = useAppSelector(selectCurrentToken);

  const [isManager, setIsManager] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [status, setStatus] = useState("Employee");

  if (token) {
    const decoded = jwtDecode(token) as IUserInfo;
    const { email, roles } = decoded.UserInfo;

    if (roles.includes("Manager")) {
      setIsManager(true);
      setStatus("Manager");
    }

    if (roles.includes("Admin")) {
      setIsAdmin(true);
      setStatus("Admin");
    }

    return { email, roles, status, isAdmin, isManager };
  }

  return { email: "", roles: [], isAdmin, isManager, status };
};

export default useAuth;
