import React, { useState, useContext } from "react";
import axios from "axios";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { EditContactContext } from "./../context/UserContext";

export default function EditContactDialog() {
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

  const {
    handleContact,
    user,
    handleDialogEdit,
    handleAllContacts,
    editContact
  } = useContext(EditContactContext);
  const [val, setVal] = useState({
    firstName: editContact.first_name,
    lastName: editContact.last_name,
    homePhone: editContact.home_phone,
    workPhone: editContact.work_phone,
    email: editContact.email,
    city: editContact.city,
    stateOrProvince: editContact.state_or_province,
    postalCode: editContact.postal_code,
    country: editContact.country
  });
  const tokenObject = { Authorization: `Bearer ${user.token}` };
  const addVal = e => {
    setVal({ ...val, [e.target.name]: e.target.value });
  };
  function handleForm(e) {
    axios
      .patch(
        "http://localhost:3001/api/editcontact",
        {
          contactid: editContact.contactid,
          first_name: val.firstName,
          last_name: val.lastName,
          home_phone: val.homePhone,
          work_phone: val.workPhone,
          email: val.email,
          city: val.city,
          state_or_province: val.stateOrProvince,
          postal_code: val.postalCode,
          country: val.country
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
      )
      .then(res => {
        //close dialog on submit
        handleDialogEdit(false);
      })
      .catch(err => console.log(err));

    axios
      .get(`http://localhost:3001/api/getallcontacts?userId=${user.id}`, {
        headers: tokenObject
      })
      .then(res => {
        handleAllContacts(res.data);
      })
      .catch(err => console.log(err));
    e.preventDefault();
  }
  return (
    <Box style={styles.dialog}>
      <h2 id="modal-title">Edit Contact</h2>

      <form style={styles.form} onSubmit={handleForm}>
        <TextField
          required
          label="First Name"
          name="firstName"
          value={val.firstName}
          onChange={e => {
            addVal(e);
          }}
          margin="normal"
        />
        <TextField
          required
          label="Last Name"
          name="lastName"
          value={val.lastName}
          onChange={e => {
            addVal(e);
          }}
          margin="normal"
        />
        <TextField
          label="Home Phone"
          name="homePhone"
          value={val.homePhone}
          onChange={e => {
            addVal(e);
          }}
          margin="normal"
        />
        <TextField
          label="Work Phone"
          name="workPhone"
          value={val.workPhone}
          onChange={e => {
            addVal(e);
          }}
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          value={val.email}
          onChange={e => {
            addVal(e);
          }}
          margin="normal"
        />
        <TextField
          label="City"
          name="city"
          value={val.city}
          onChange={e => {
            addVal(e);
          }}
          margin="normal"
        />
        <TextField
          label="State or Province"
          name="stateOrProvince"
          value={val.stateOrProvince}
          onChange={e => {
            addVal(e);
          }}
          margin="normal"
        />
        <TextField
          label="Postal Code"
          name="postalCode"
          value={val.postalCode}
          onChange={e => {
            addVal(e);
          }}
          margin="normal"
        />
        <TextField
          label="Country"
          name="country"
          value={val.country}
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
