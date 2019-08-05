import React, { useState, useEffect, createContext } from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import HomePage from "./components/HomePage";
import UserContext from "./context/UserContext";

function App(props) {
  const [loggedIn, handleLoggedIn] = useState(true);

  return (
    <HashRouter>
      <Switch>
        {/* <Route
          exact
          path="/"
          render={() => (loggedIn ? <LandingPage /> : <HomePage />)}
        /> */}

        {/* {!loggedIn ? (
          <Redirect to="/" exact />
        ) : (
          <Switch>
            <Route path="/home" component={HomePage} />
            <Route path="/" exact component={LandingPage} />
          </Switch>
        )} */}
        <UserContext.Provider value={(loggedIn, handleLoggedIn)}>
          <Route path="/" exact component={LandingPage} />
          <Route path="/home" component={HomePage} />
        </UserContext.Provider>
      </Switch>
    </HashRouter>
  );
}

export default App;
