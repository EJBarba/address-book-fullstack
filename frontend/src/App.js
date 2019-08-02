import React from "react";
import { HashRouter, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import HomePage from "./components/HomePage";
function App() {
  return (
    <HashRouter>
      <Route exact path="/" component={LandingPage} />
      <Route path="/home" component={HomePage} />
    </HashRouter>
  );
}

export default App;
