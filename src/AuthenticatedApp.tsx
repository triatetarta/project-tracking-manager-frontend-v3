import { MouseEvent, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Prefetch from "./Auth/components/Prefetch";
import Dashboard from "./Dashboard/components/Dashboard";
import ErrorPage from "./Error/components/ErrorPage";
import Navbar from "./Navigation/components/Navbar";
import Account from "./Profile/components/Account";
import Projects from "./Projects/components/Projects";
import WorkflowStatus from "./WorkflowStatus/components/WorkflowStatus";

const AuthenticatedApp = () => {
  const [openAccountMenu, setOpenAccountMenu] = useState(false);

  const closeOpenMenus = (
    e: MouseEvent<HTMLDivElement> | MouseEvent<HTMLElement>
  ) => {
    e.stopPropagation();

    if (e.currentTarget.classList.contains("accountButton")) return;
    if (!e.currentTarget.classList.contains("accountMenu")) {
      setOpenAccountMenu(false);
    }
  };

  return (
    <div
      onClick={(e) => closeOpenMenus(e)}
      className='min-h-screen overflow-hidden'
    >
      <Navbar
        openAccountMenu={openAccountMenu}
        setOpenAccountMenu={setOpenAccountMenu}
        closeOpenMenus={closeOpenMenus}
      />
      <Routes>
        <Route element={<Prefetch />}>
          <Route path='/' element={<Dashboard />} />
          <Route path='/account' element={<Account />} />
          <Route path='/projects' element={<Projects />} />
          <Route path='/workflows' element={<WorkflowStatus />} />
        </Route>

        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </div>
  );
};

export default AuthenticatedApp;
