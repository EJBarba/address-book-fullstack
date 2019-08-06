import React, { useState, useEffect, createContext } from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import HomePage from "./components/HomePage";
import RedirectPage from "./components/RedirectPage";
import UserContext from "./context/UserContext";

function App(props) {
  const [loggedIn, handleLoggedIn] = useState(false);

  return (
    <HashRouter>
      <Switch>
        <UserContext.Provider value={{ loggedIn, handleLoggedIn }}>
          <Route path="/" exact component={LandingPage} />
          <Route path="/home" component={HomePage} />
          <Route path="/redirect" component={RedirectPage} />
        </UserContext.Provider>
      </Switch>
    </HashRouter>
  );
}

export default App;
