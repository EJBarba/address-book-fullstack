import React, { useState } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import HomePage from "./components/HomePage";
import RedirectPage from "./components/RedirectPage";
import { UserContext } from "./context/UserContext";

function App(props) {
  const [loggedIn, handleLoggedIn] = useState(false);
  const [user, handleUser] = useState({});

  return (
    <HashRouter>
      <Switch>
        <UserContext.Provider
          value={{ loggedIn, handleLoggedIn, user, handleUser }}
        >
          <Route path="/" exact component={LandingPage} />
          <Route path="/home" component={HomePage} />
          <Route path="/redirect" component={RedirectPage} />
        </UserContext.Provider>
      </Switch>
    </HashRouter>
  );
}

export default App;
