import React from "react";
import ReactDOM from "react-dom";

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
      height: "100vh"
    },
    card: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      alignContent: "space-between",
      width: "500px",
      height: "500px",
      color: "#ED2553",
      fontSize: "50px",
      borderRadius: "25px",
      borderShadow: "5px 10px"
    }
  };
  document.body.style.backgroundColor = "#222";
  return (
    <Container width={1} style={styles.container}>
      <Card style={styles.card} boxShadow={10}>
        <p>WELCOME</p>

        <FormControl>
          <InputLabel htmlFor="my-input">Username</InputLabel>
          <Input id="my-input" aria-describedby="my-helper-text" />
          <FormHelperText id="my-helper-text">
            “In order to be irreplaceable one must always <br /> be different.”
            - Coco Chanel.
          </FormHelperText>
        </FormControl>

        <FormControl>
          <InputLabel htmlFor="my-input">Password</InputLabel>
          <Input id="my-input" aria-describedby="my-helper-text" />
          <FormHelperText id="my-helper-text">
            We'll never share your password.
          </FormHelperText>
        </FormControl>

        <Button variant="outlined">Login</Button>
        <Button>No Account Yet? Sign Up</Button>
      </Card>
    </Container>
  );
}
