import React, { useState } from "react";
import logo from "./../img/logo.png";

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
      alignContent: "space-between",
      width: "500px",
      height: "700px",
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
  document.body.style.backgroundColor = "#eeeeef";

  const [username, getUsername] = useState({ username: "" });
  const [password, getPassword] = useState({ password: "" });
  return (
    <Container width={1} style={styles.container}>
      <Card style={styles.card}>
        <img src={logo} style={styles.logo} alt="logo" />

        <FormControl style={styles.textbox}>
          <InputLabel>Username</InputLabel>
          <Input id="username" />
          <FormHelperText>Enter Your Username</FormHelperText>
        </FormControl>

        <FormControl style={styles.textbox}>
          <InputLabel>Password</InputLabel>
          <Input id="password" />
          <FormHelperText>Enter Your Password</FormHelperText>
        </FormControl>

        <Button variant="outlined" style={styles.textbox}>
          Login
        </Button>
        <Button>No Account Yet? Sign Up</Button>
      </Card>
    </Container>
  );
}
