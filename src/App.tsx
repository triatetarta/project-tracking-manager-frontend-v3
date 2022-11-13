import { Routes, Route } from "react-router-dom";
import Login from "./Auth/components/Login";
import Dashboard from "./Dashboard/components/Dashboard";
import Home from "./Homepage/components/Home";
import Navbar from "./Navigation/components/Navbar";
import PrivateRoute from "./PrivateRoute/components/PrivateRoute";
import Prefetch from "./Auth/components/Prefetch";
import PersistLogin from "./Auth/components/PersistLogin";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />

        <Route element={<PersistLogin />}>
          <Route element={<Prefetch />}>
            <Route path='/dashboard' element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
