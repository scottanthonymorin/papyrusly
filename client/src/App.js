import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GlobalStyles from "./components/GlobalStyles/GlobalStyles";
import { ThemeProvider } from "styled-components";
import Theme from "./components/GlobalStyles/theme";

import AppClient from "./components/AppClient/AppClient";

function App() {
  return (
    <>
      <ThemeProvider theme={Theme}>
        <GlobalStyles />
        <Router>
          <Switch>
            <Route path="/">
              <AppClient />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
