import React, { useState, useEffect, useContext } from "react";
import { HashRouter, Route, Link, Redirect } from "react-router-dom";
import UserContext from "./../context/UserContext";

export default function HomePage() {
  //document.body.style.backgroundSize = "100% 100%";
  const { loggedIn, handleLoggedIn } = useContext(UserContext);
  return !loggedIn ? <Redirect to="/" /> : <Link to="/">Landing</Link>;
}
