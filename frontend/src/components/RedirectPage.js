import React, { useEffect } from "react";
import { Link } from "react-router-dom";
export default function Redirect() {
  useEffect(() => {
    document.body.style.background = null;
  });
  return (
    <div>
      <h1>You are not logged in.</h1>
      <Link to="/">Go to Login</Link>
    </div>
  );
}
