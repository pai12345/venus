import "./App.css";
import React, { Fragment, lazy } from "react";

const ButtonAppBar = lazy(() => import("../mainpage/mainpage"));

const App = () => {
  return (
    <Fragment>
      <ButtonAppBar />
    </Fragment>
  );
};

export default App;
