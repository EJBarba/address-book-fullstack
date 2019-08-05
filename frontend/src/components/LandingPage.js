import React, { useState, useEffect } from "react";
import { HashRouter, Route, Link, Redirect } from "react-router-dom";

import logo from "./../img/logo.png";
import backgroundImage from "./../img/background.jpg";
import axios from "axios";

import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import { FormControl } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import Collapse from "@material-ui/core/Collapse";
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
      margin: "5px 10px",
      width: "300px"
    }
  };
  document.body.style.background = `url(${backgroundImage}) no-repeat center center`;
  document.body.style.backgroundSize = "100% 100%";

  //toggle Login/Signup
  const [currentForm, toggleForm] = useState(true);

  ///////////////Register/////////////////////
  const [formVal, setVal] = useState({
    //login values
    usernameLG: "",
    passwordLG: "",
    //registration values
    usernameRG: "",
    password1RG: "",
    password2RG: ""
  });
  //input turns red
  const [requiredNotEmpty, toggleRNE] = useState({
    usernameLG: false,
    passwordLG: false,
    usernameRG: false,
    password1RG: false,
    password2RG: false
  });
  //show formHelperText if empty
  const [fhtError, toggleFHT] = useState({
    usernameLG: "",
    passwordLG: "",
    usernameRG: "",
    password1RG: "",
    password2RG: ""
  });

  const addRegisterVal = e => {
    setVal({ ...formVal, [e.target.name]: e.target.value });
    console.log(formVal);
  };

  function handleLogin(e) {
    console.log(
      "usernameLG->",
      formVal.usernameLG,
      "passwordLG->",
      formVal.passwordLG
    );
    if (!formVal.usernameLG && !formVal.passwordLG) {
      toggleFHT({
        ...fhtError,
        usernameLG: "Username must not be empty",
        passwordLG: "Password must not be empty"
      });
      toggleRNE({ ...requiredNotEmpty, usernameLG: true, passwordLG: true });
    } else if (!formVal.usernameLG) {
      toggleFHT({
        ...fhtError,
        usernameLG: "Username must not be empty"
      });
      toggleRNE({ ...requiredNotEmpty, usernameLG: true });
    } else if (!formVal.passwordLG) {
      toggleFHT({
        ...fhtError,
        passwordLG: "Password must not be empty"
      });
      toggleRNE({ ...requiredNotEmpty, passwordLG: true });
    } else {
      //axios here
      axios
        .post("http://localhost:3001/api/login", {
          username: formVal.usernameLG,
          password: formVal.passwordLG
        })
        .then(data => {
          console.log("data ->", data);
        });
      //go to home
    }

    e.preventDefault();
  }
  function handleRegister(e) {
    console.log(
      "usernameRG->",
      formVal.usernameRG,
      "password1RG->",
      formVal.password1RG,
      "password2RG->",
      formVal.password2RG
    );

    //All Textboxes
    if (!formVal.usernameRG && !formVal.password1RG && !formVal.password2RG) {
      toggleFHT({
        ...fhtError,
        usernameRG: "Username must not be empty",
        password1RG: "Password must not be empty",
        password2RG: "Please confirm password"
      });
      toggleRNE({
        ...requiredNotEmpty,
        usernameRG: true,
        password1RG: true,
        password2RG: true
      });
    }
    //First and Second TextBox
    else if (!formVal.usernameRG && !formVal.password1RG) {
      toggleFHT({
        ...fhtError,
        usernameRG: "Username must not be empty",
        password1RG: "Password must not be empty"
      });
      toggleRNE({ ...requiredNotEmpty, usernameRG: true, password1RG: true });
    }
    //First and Third Textbox
    else if (!formVal.usernameRG && !formVal.password2RG) {
      toggleFHT({
        ...fhtError,
        usernameRG: "Username must not be empty",
        password2RG: "Please confirm password"
      });
      toggleRNE({ ...requiredNotEmpty, usernameRG: true, password2RG: true });
    }
    //Second and Third Textbox
    else if (!formVal.usernameRG && !formVal.password2RG) {
      toggleFHT({
        ...fhtError,
        password1RG: "Password must not be empty",
        password2RG: "Please confirm password"
      });
      toggleRNE({ ...requiredNotEmpty, password1RG: true, password2RG: true });
    } else if (!formVal.usernameRG) {
      toggleFHT({
        ...fhtError,
        usernameRG: "Username must not be empty"
      });
      toggleRNE({ ...requiredNotEmpty, usernameRG: true });
    } else if (!formVal.password1RG) {
      toggleFHT({ ...fhtError, password1RG: "Password must not be empty" });
      toggleRNE({ ...requiredNotEmpty, password1RG: true });
    } else if (!formVal.password2RG) {
      toggleFHT({ ...fhtError, password2RG: "Please confirm password" });
      toggleRNE({ ...requiredNotEmpty, password2RG: true });
    } else {
      axios
        .post("http://localhost:3001/api/register", {
          username: formVal.usernameRG,
          password: formVal.password1RG
        })
        .then(data => {
          console.log("data ->", data);
        });
      alert("Registered Successfully");
      changeForm();
    }
    e.preventDefault();
  }

  useEffect(() => {
    //Login
    if (formVal.usernameLG.length > 0) {
      toggleFHT({ ...fhtError, usernameLG: "" });
      toggleRNE({ ...requiredNotEmpty, usernameLG: false });
    }
    if (formVal.passwordLG.length > 0) {
      toggleFHT({ ...fhtError, passwordLG: "" });
      toggleRNE({ ...requiredNotEmpty, passwordLG: false });
    }
    if (formVal.usernameLG.length > 0 && formVal.passwordLG.length > 0) {
      toggleFHT({ ...fhtError, usernameLG: "", passwordLG: "" });
      toggleRNE({ ...requiredNotEmpty, usernameLG: false, passwordLG: false });
    }

    //Register
    if (formVal.usernameRG.length > 0) {
      toggleFHT({ ...fhtError, usernameRG: "" });
      toggleRNE({ ...requiredNotEmpty, usernameRG: false });
    }
    if (formVal.password1RG.length > 0) {
      toggleFHT({ ...fhtError, password1RG: "" });
      toggleRNE({ ...requiredNotEmpty, password1RG: false });
    }
    if (formVal.password2RG.length > 0) {
      toggleFHT({ ...fhtError, password2RG: "" });
      toggleRNE({ ...requiredNotEmpty, password2RG: false });
    }
    //First and Second Textbox
    if (formVal.usernameRG.length > 0 && formVal.password1RG.length > 0) {
      toggleFHT({ ...fhtError, usernameRG: "", password1RG: "" });
      toggleRNE({ ...requiredNotEmpty, usernameRG: false, password1RG: false });
    }
    //First and Third Textbox
    if (formVal.usernameRG.length > 0 && formVal.password2RG.length > 0) {
      toggleFHT({ ...fhtError, usernameRG: "", password2RG: "" });
      toggleRNE({ ...requiredNotEmpty, usernameRG: false, password2RG: false });
    }
    //Second and Third Textbox
    if (formVal.password1RG.length > 0 && formVal.password2RG.length > 0) {
      toggleFHT({ ...fhtError, password1RG: "", password2RG: "" });
      toggleRNE({
        ...requiredNotEmpty,
        password1RG: false,
        password2RG: false
      });
    }
    if (
      formVal.usernameRG.length > 0 &&
      formVal.password1RG.length > 0 &&
      formVal.password2RG.length > 0
    ) {
      toggleFHT({
        ...fhtError,
        usernameRG: "",
        password1RG: "",
        password2RG: ""
      });
      toggleRNE({
        ...requiredNotEmpty,
        usernameRG: false,
        password1RG: false,
        password2RG: false
      });
    }

    //equivalent to componentWillUnmount
    // return () => {
    //   document.body.style.background = null;
    // };
  });

  function changeForm() {
    toggleForm(!currentForm);
  }

  return (
    <Container width={1} style={styles.container}>
      <Card style={styles.card}>
        <img src={logo} style={styles.logo} alt="logo" />

        {/*---------------- LOGIN -------------------------*/}
        <Collapse in={currentForm}>
          <form style={styles.form} onSubmit={handleLogin}>
            {/* USERNAME */}
            <FormControl
              error={requiredNotEmpty.usernameLG}
              style={styles.textbox}
            >
              <InputLabel>Username</InputLabel>
              <Input
                id="usernameLG"
                name="usernameLG"
                value={formVal.usernameLG}
                onChange={e => {
                  addRegisterVal(e);
                }}
              />
              <FormHelperText error={requiredNotEmpty.usernameLG}>
                {fhtError.usernameLG}
              </FormHelperText>
            </FormControl>

            {/* PASSWORD */}
            <FormControl
              error={requiredNotEmpty.passwordLG}
              style={styles.textbox}
            >
              <InputLabel>Password</InputLabel>
              <Input
                type="password"
                id="passwordLG"
                name="passwordLG"
                value={formVal.passwordLG}
                onChange={e => {
                  addRegisterVal(e);
                }}
              />
              <FormHelperText error={requiredNotEmpty.passwordLG}>
                {fhtError.passwordLG}
              </FormHelperText>
            </FormControl>

            <Button variant="outlined" style={styles.textbox} type="submit">
              LOGIN
            </Button>
            <Button onClick={changeForm}>Don't Have an Account? Sign Up</Button>
          </form>
        </Collapse>

        {/*////////////////// Register //////////////////////////*/}
        <Collapse in={!currentForm}>
          <form style={styles.form} onSubmit={handleRegister}>
            {/* USERNAME */}
            <FormControl
              error={requiredNotEmpty.usernameRG}
              style={styles.textbox}
            >
              <InputLabel>Username</InputLabel>
              <Input
                id="usernameRG"
                name="usernameRG"
                value={formVal.usernameRG}
                onChange={e => {
                  addRegisterVal(e);
                }}
              />
              <FormHelperText error={requiredNotEmpty.usernameRG}>
                {fhtError.usernameRG}
              </FormHelperText>
            </FormControl>

            {/* PASSWORD1 */}
            <FormControl
              error={requiredNotEmpty.password1RG}
              style={styles.textbox}
            >
              <InputLabel>Password</InputLabel>
              <Input
                type="password"
                id="password1RG"
                name="password1RG"
                value={formVal.password1RG}
                onChange={e => {
                  addRegisterVal(e);
                }}
              />
              <FormHelperText error={requiredNotEmpty.password1RG}>
                {fhtError.password1RG}
              </FormHelperText>
            </FormControl>

            {/* PASSWORD2 */}
            <FormControl
              error={requiredNotEmpty.password2RG}
              style={styles.textbox}
            >
              <InputLabel>Re-Enter Password</InputLabel>
              <Input
                type="password"
                id="password2RG"
                name="password2RG"
                value={formVal.password2RG}
                onChange={e => {
                  addRegisterVal(e);
                }}
              />
              <FormHelperText error={requiredNotEmpty.password2RG}>
                {fhtError.password2RG}
              </FormHelperText>
            </FormControl>

            <Button variant="outlined" style={styles.textbox} type="submit">
              Register
            </Button>
            <Button onClick={changeForm}>Have an Account? Login</Button>
          </form>
        </Collapse>
      </Card>
    </Container>
  );
}
