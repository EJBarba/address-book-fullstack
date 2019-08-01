import React, { useState, useEffect } from "react";

import logo from "./../img/logo.png";
import backgroundImage from "./../img/background.jpg";

import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import { FormControl } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";

import Button from "@material-ui/core/Button";

export default function LandingPage() {
  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      flexDirection: "column"
    },
    box: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#fff"
    },
    card: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "center",
      alignContent: "center",
      width: "500px",
      height: "700px",
      color: "#ED2553",
      fontSize: "50px",
      borderRadius: "25px",
      borderShadow: "5px 10px"
    },
    form: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "center",
      alignContent: "center",
      width: "500px",
      height: "250px",
      color: "#ED2553",
      fontSize: "50px",
      borderRadius: "25px",
      borderShadow: "5px 10px"
    },
    logo: {
      margin: "50px 26px 26px"
    },
    textbox: {
      margin: "10px",
      width: "300px"
    }
  };
  document.body.style.background = `url(${backgroundImage}) no-repeat center center`;
  document.body.style.backgroundSize = "100% 100%";
  const [username, getUsername] = useState("");
  const [password, getPassword] = useState("");

  //required highlights
  const [isRequiredUsername, toggleRequiredUsername] = useState(false);
  const [isRequiredPassword, toggleRequiredPassword] = useState(false);

  //show FormHelperText if empty text field
  const [formHelperUsername, toggleFHU] = useState("");
  const [formHelperPassword, toggleFHP] = useState("");

  useEffect(() => {
    if (username.length > 0) {
      toggleRequiredUsername(false);
    }
    if (password.length > 0) {
      toggleRequiredPassword(false);
    }
  });

  function getAll(e) {
    console.log(username);
    console.log(password);
    if (!username) {
      toggleRequiredUsername(true);
      toggleFHU("Please Enter Your Username");
    }
    if (!password) {
      toggleRequiredPassword(true);
      toggleFHP("Please Enter Your Password");
    }
    e.preventDefault();
  }
  return (
    <Container width={1} style={styles.container}>
      <Card style={styles.card}>
        <img src={logo} style={styles.logo} alt="logo" />

        <form style={styles.form} onSubmit={getAll}>
          <FormControl style={styles.textbox}>
            <InputLabel error={isRequiredUsername}>Username</InputLabel>
            <Input
              error={isRequiredUsername}
              id="username"
              value={username}
              onChange={e => {
                getUsername(e.target.value);
              }}
            />
            <FormHelperText error={isRequiredUsername}>
              {formHelperUsername}
            </FormHelperText>
          </FormControl>

          <FormControl style={styles.textbox}>
            <InputLabel error={isRequiredPassword}>Password</InputLabel>
            <Input
              error={isRequiredPassword}
              type="password"
              id="password"
              value={password}
              onChange={e => getPassword(e.target.value)}
            />
            <FormHelperText error={isRequiredPassword}>
              {formHelperPassword}
            </FormHelperText>
          </FormControl>

          <Button variant="outlined" style={styles.textbox} type="submit">
            Login
          </Button>
        </form>

        <Button>No Account Yet? Sign Up</Button>
      </Card>
    </Container>
  );
}
