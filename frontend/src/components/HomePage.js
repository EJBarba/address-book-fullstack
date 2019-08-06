import React, { useState, useEffect, useContext } from "react";
import { HashRouter, Route, Link, Redirect } from "react-router-dom";
import UserContext from "./../context/UserContext";

export default function HomePage() {
  useEffect(() => {
    document.body.style.background = null;
  });
  const { loggedIn, handleLoggedIn } = useContext(UserContext);
  console.log(loggedIn);
  return !loggedIn ? (
    <Redirect to="/redirect" />
  ) : (
    <div>
      <h1>Welcome to Home</h1>
      <button onClick={() => handleLoggedIn(false)}>Logout</button>
    </div>
  );
}
