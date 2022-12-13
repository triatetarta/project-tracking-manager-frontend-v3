import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useRefreshMutation } from "../Auth/features/authApiSlice";
import { logIn, selectCurrentToken } from "../Auth/features/authSlice";

const useCheckAuthStatus = () => {
  const [checkingStatus, setCheckingStatus] = useState(true);
  const token = useAppSelector(selectCurrentToken);
  const effectRan = useRef(false);

  const [refresh, { isLoading, isSuccess, isError, error }] =
    useRefreshMutation();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== "development") {
      const persist = JSON.parse(localStorage.getItem("persist") ?? "{}");

      if (!persist) {
        setCheckingStatus(false);
      }

      const verifyRefreshToken = async () => {
        try {
          //@ts-ignore
          await refresh();

          dispatch(logIn());
          setCheckingStatus(false);
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

  return {
    isLoading,
    isError,
    isSuccess,
    error,
    checkingStatus,
  };
};

export default useCheckAuthStatus;
