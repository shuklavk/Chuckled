import React from "react";
import App from "./App";
import Display from "./Display";

const routes = {
  "/": () => <App />,
  "/joke": () => <Display joke={"Why are giraffes so slow to apologize? Because it takes them a long time to swallow their pride."} img={"https://storage.googleapis.com/hacklarious/current.jpg"}/>
};
export default routes;