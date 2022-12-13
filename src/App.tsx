import { lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import useCheckAuthStatus from "./hooks/useCheckAuthStatus";
import FullScreenSpinner from "./Icons/components/FullScreenSpinner";
import { useAppSelector } from "./app/hooks";
import Favicon from "react-favicon";

const AuthenticatedApp = lazy(
  () => import(/* webpackPrefetch: true */ "./AuthenticatedApp")
);
const UnauthenticatedApp = lazy(() => import("./UnauthenticatedApp"));

const App = () => {
  const { checkingStatus } = useCheckAuthStatus();
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  if (checkingStatus) return <FullScreenSpinner />;

  return (
    <div className='min-h-screen overflow-hidden'>
      <Favicon url='https://i.imgur.com/qFpAgSP.png' />
      <Toaster />

      <Suspense fallback={<FullScreenSpinner />}>
        {isLoggedIn ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </Suspense>
    </div>
  );
};

export default App;
