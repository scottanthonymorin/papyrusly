import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GlobalStyles from "./components/GlobalStyles/GlobalStyles";

import AppClient from "./components/AppClient/AppClient";

function App() {
  return (
    <>
      <GlobalStyles />
      <Router>
        <Switch>
          <Route path="/">
            <AppClient />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
