import { FC, ReactElement } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute: FC = (): ReactElement => {
  return <Outlet />;
};

export default PrivateRoute;
