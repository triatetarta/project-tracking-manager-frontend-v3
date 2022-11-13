import { Routes, Route } from "react-router-dom";
import Login from "./Auth/components/Login";
import Dashboard from "./Dashboard/components/Dashboard";
import Home from "./Homepage/components/Home";
import Navbar from "./Navigation/components/Navbar";
import PrivateRoute from "./PrivateRoute/components/PrivateRoute";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<PrivateRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
