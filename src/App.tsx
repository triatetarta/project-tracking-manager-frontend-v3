import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard/components/Dashboard";
import Home from "./Homepage/components/Home";
import PrivateRoute from "./PrivateRoute/components/PrivateRoute";

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dashboard' element={<PrivateRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
