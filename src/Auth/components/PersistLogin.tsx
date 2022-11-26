import { Outlet } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useRefreshMutation } from "../features/authApiSlice";
import usePersist from "../../hooks/usePersist";
import { useAppSelector } from "../../app/hooks";
import { selectCurrentToken } from "../features/authSlice";
import LoaderSpinner from "../../Icons/components/LoaderSpinner";

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
    return (
      <div className='fixed top-0 left-0 bottom-0 right-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm'>
        <LoaderSpinner color='dark:fill-white' />
      </div>
    );
  }

  if (isError && error !== undefined) {
    return (
      <div className='fixed top-0 left-0 bottom-0 right-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm'>
        <div className='bg-white p-4 rounded-lg flex flex-col items-center justify-center'>
          <div>{"status" in error && error.status}</div>
          <div>{"error" in error && JSON.stringify(error.error)}</div>
        </div>
      </div>
    );
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
