import React, { useState, useContext } from "react";

import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { AddContactContext } from "./../context/UserContext";

export default function AddContactDialog() {
  const styles = {
    dialog: {
      width: "375px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      padding: "20px"
    },
    form: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column"
    },
    button: {
      width: "200px",
      marginTop: "20px"
    }
  };

  const { addContact, handleContact } = useContext(AddContactContext);
  const [val, setVal] = useState({
    firstName: "",
    lastName: "",
    homePhone: "",
    workPhone: "",
    email: "",
    city: "",
    stateOrProvince: "",
    postalCode: "",
    country: ""
  });
  const addVal = e => {
    console.log("hey");
    setVal({ ...val, [e.target.name]: e.target.value });
  };
  function handleForm(e) {
    console.log(val);
    e.preventDefault();
  }
  return (
    <Box style={styles.dialog}>
      <h2 id="modal-title">Add Contact</h2>

      <form style={styles.form} onSubmit={handleForm}>
        <TextField
          required
          label=" First Name"
          name="firstName"
          value={val.firstName}
          onChange={e => {
            addVal(e);
          }}
          margin="normal"
        />
        <TextField
          required
          label=" Last Name"
          name="lastName"
          value={val.lastName}
          onChange={e => {
            addVal(e);
          }}
          margin="normal"
        />
        <Button variant="outlined" style={styles.button} type="submit">
          SUBMIT
        </Button>
      </form>
    </Box>
  );
}
