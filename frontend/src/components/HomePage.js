import React, { useState, useEffect, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { UserContext } from "./../context/UserContext";

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
      flexDirection: "column",
      padding: "20px"
    },
    card: {
      width: "375px"
    }
  };

  //hooks

  const [expandBtn, handeExpandBtn] = useState(false);
  const [expandModal, handleModal] = useState(false);
  const [addContact, handleContact] = useState({});

  useEffect(() => {
    document.body.style.background = "#e2e2e2";
  });
  const { loggedIn, handleLoggedIn, user } = useContext(UserContext);
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
                handleModal(true);
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
        <Card style={styles.card}>
          <CardHeader
            title="Bill Gates"
            action={
              <IconButton
                onClick={() => {
                  handeExpandBtn(!expandBtn);
                  console.log(addContact);
                }}
              >
                <ExpandMoreIcon />
              </IconButton>
            }
          />
          <Collapse in={expandBtn} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography>Home: 123-789</Typography>
              <Typography>Work: 214-911</Typography>
              <Typography>Email: bill.gates@microsoft.com</Typography>
              <Typography>City: Lake City</Typography>
              <Typography>State/Province: Utah</Typography>
              <Typography>Postal Code: 4500</Typography>
              <Typography>Country: United States of America</Typography>
            </CardContent>
          </Collapse>
        </Card>
      </Box>

      {/* DIALOG */}
      <Dialog
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        open={expandModal}
        onClose={() => handleModal(false)}
      >
        <AddContactContext.Provider value={{ handleContact, user }}>
          <AddContactDialog />
        </AddContactContext.Provider>
      </Dialog>
    </div>
  );
}
