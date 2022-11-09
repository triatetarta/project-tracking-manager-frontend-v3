import { FC, ReactElement } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Homepage/components/Home";
import PrivateRoute from "./PrivateRoute/components/PrivateRoute";

const App: FC = (): ReactElement => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/tickets' element={<PrivateRoute />}></Route>
      </Routes>
    </>
  );
};

export default App;
