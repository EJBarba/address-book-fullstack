import React, { useState, useEffect, useContext, useRef } from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from "./../context/UserContext";
import axios from "axios";
import update from "immutability-helper";

import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import PersonAdd from "@material-ui/icons/PersonAdd";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Collapse from "@material-ui/core/Collapse";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import Dialog from "@material-ui/core/Dialog";
import AddContactDialog from "./AddContactDialog";
import { AddContactContext } from "./../context/UserContext";

export default function HomePage() {
  //styling
  const styles = {
    appBar: {
      display: "flex",
      justifyContent: "space-between"
    },
    box: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "wrap",
      padding: "20px"
    },
    card: {
      width: "375px",
      margin: "26px"
    }
  };

  //hooks

  const [expandBtn, handeExpandBtn] = useState(false);
  const [expandDialog, handleDialog] = useState(false);
  const [addContact, handleContact] = useState({});
  const [contacts, handleAllContacts] = useState([]);

  const { loggedIn, handleLoggedIn, user } = useContext(UserContext);

  useEffect(() => {
    document.body.style.background = "#e2e2e2";

    console.log("contacts", contacts);
    console.log("prevcontacts", prevContacts);
    if (!prevContacts || contacts == prevContacts) {
      axios
        .get(`http://localhost:3001/api/getallcontacts?userId=${user.id}`)
        .then(res => {
          let newObj = res.data;
          //add toggle to each object
          newObj.map(e => {
            if (!e.toggle) {
              e.toggle = false;
            }
          });
          console.log("NEWOBJECT", newObj);
          handleAllContacts(newObj);
          //console.log("DUURING");
          //console.log("USERR", user);
        })
        .catch(err => console.log(err));
    }
  });

  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  const prevContacts = usePrevious(contacts);

  console.log(loggedIn);
  console.log(user);
  return !loggedIn ? (
    <Redirect to="/redirect" />
  ) : (
    <div>
      <AppBar position="static">
        <Toolbar style={styles.appBar}>
          <IconButton
            edge="start"
            //className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <PersonAdd
              onClick={() => {
                console.log("from homepage", addContact);
                handleDialog(true);
              }}
            />
          </IconButton>
          <Typography variant="h6">Welcome, {user.username}!</Typography>
          <Button color="inherit" onClick={() => handleLoggedIn(false)}>
            Log Out
          </Button>
        </Toolbar>
      </AppBar>
      <Box style={styles.box}>
        {/* CONTENT */}
        {!contacts
          ? null
          : contacts.map((user, index) => (
              <Card style={styles.card}>
                <CardHeader
                  title={`${user.first_name} ${user.last_name}`}
                  action={
                    <IconButton
                      onClick={() => {
                        var state1 = contacts;
                        var updateToggle = contacts[index].toggle;
                        var state2 = update(state1, {
                          [index]: { toggle: { $set: !updateToggle } }
                        });
                        handleAllContacts(state2);
                        //console.log(contacts[index].toggle);
                        console.log(state1);
                        console.log(state2);
                        //console.log(addContact);
                      }}
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  }
                />
                <Collapse in={user.toggle} timeout="auto" unmountOnExit>
                  <CardContent>
                    <Typography>{user.first_name}</Typography>
                    <Typography>{user.last_name}</Typography>
                  </CardContent>
                </Collapse>
              </Card>
            ))}
      </Box>

      {/* DIALOG */}
      <Dialog
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        open={expandDialog}
        onClose={() => handleDialog(false)}
      >
        <AddContactContext.Provider
          value={{ handleContact, user, handleDialog, handleAllContacts }}
        >
          <AddContactDialog />
        </AddContactContext.Provider>
      </Dialog>
    </div>
  );
}
