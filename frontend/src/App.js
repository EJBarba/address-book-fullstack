import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import HomePage from "./components/HomePage";
function App() {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/home" component={HomePage} />
      </Switch>
    </HashRouter>
  );
}

export default App;
