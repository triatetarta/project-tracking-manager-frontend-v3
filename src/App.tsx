import { Routes, Route } from "react-router-dom";
import Login from "./Auth/components/Login";
import Dashboard from "./Dashboard/components/Dashboard";
import Home from "./Homepage/components/Home";
import Navbar from "./Navigation/components/Navbar";
import Prefetch from "./Auth/components/Prefetch";
import PersistLogin from "./Auth/components/PersistLogin";
import Register from "./Auth/components/Register";
import { useState, MouseEvent } from "react";
import Account from "./Profile/components/Account";
import { Toaster } from "react-hot-toast";
import Projects from "./Projects/components/Projects";
import WorkflowStatus from "./WorkflowStatus/components/WorkflowStatus";

const App = () => {
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
      <Toaster />
      <Navbar
        openAccountMenu={openAccountMenu}
        setOpenAccountMenu={setOpenAccountMenu}
        closeOpenMenus={closeOpenMenus}
      />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        <Route element={<PersistLogin />}>
          <Route element={<Prefetch />}>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/account' element={<Account />} />
            <Route path='/projects' element={<Projects />} />
            <Route path='/workflows' element={<WorkflowStatus />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
