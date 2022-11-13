import { Outlet } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useRefreshMutation } from "../features/authApiSlice";
import usePersist from "../../hooks/usePersist";
import { useAppSelector } from "../../app/hooks";
import { selectCurrentToken } from "../features/authSlice";

const PersistLogin = () => {
  const [persist] = usePersist();
  const token = useAppSelector(selectCurrentToken);
  const effectRan = useRef(false);

  const [trueSuccess, setTrueSuccess] = useState(false);

  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation();

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== "development") {
      const verifyRefreshToken = async () => {
        try {
          //@ts-ignore
          await refresh();

          setTrueSuccess(true);
        } catch (err) {
          console.error(err);
        }
      };

      if (!token && persist) verifyRefreshToken();
    }

    return () => {
      effectRan.current = true;
    };
  }, []);

  if (!persist) {
    return <Outlet />;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error</p>;
  }

  if (isSuccess && trueSuccess) {
    return <Outlet />;
  }

  if (token && isUninitialized) {
    return <Outlet />;
  }

  return null;
};

export default PersistLogin;
