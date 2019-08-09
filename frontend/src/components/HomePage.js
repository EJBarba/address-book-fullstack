import React, { useState, useEffect, useContext, useRef } from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from "./../context/UserContext";
import axios from "axios";
import update from "immutability-helper";

import SortMenu from "./SortMenu";

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
import EditContactDialog from "./EditContactDialog";
import {
  AddContactContext,
  EditContactContext,
  SortContext
} from "./../context/UserContext";

import SearchBar from "material-ui-search-bar";

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

  const [expandDialog, handleDialog] = useState(false);
  const [expandDialogEdit, handleDialogEdit] = useState(false);
  const [addContact, handleContact] = useState({});
  const [editContact, handleEditContact] = useState();
  const [contacts, handleAllContacts] = useState([]);

  const { loggedIn, handleLoggedIn, user, handleUser } = useContext(
    UserContext
  );

  const [sort, handleSort] = useState("DEFAULT");
  const [searchVal, handleSearch] = useState("");
  const tokenObject = { Authorization: `Bearer ${user.token}` };
  useEffect(() => {
    document.body.style.background = "#e2e2e2";

    if (
      searchVal.length == 0 &&
      sort === "DEFAULT" &&
      (!prevContacts || contacts == prevContacts)
    ) {
      axios
        .get(`http://localhost:3001/api/getallcontacts?userId=${user.id}`, {
          headers: tokenObject
        })
        .then(res => {
          let newObj = res.data;
          //add toggle to each object
          newObj.map(e => {
            if (!e.toggle) {
              e.toggle = false;
            }
          });
          handleAllContacts(newObj);
        })
        .catch(err => console.log(err));
    }
    if (
      searchVal.length == 0 &&
      sort !== "DEFAULT" &&
      (!prevContacts || contacts == prevContacts)
    ) {
      axios
        .get(`http://localhost:3001/api/sort?userId=${user.id}&sort=${sort}`, {
          headers: tokenObject
        })
        .then(res => {
          handleAllContacts(res.data);
        })
        .catch(err => console.log(err));
    }

    if (searchVal.length > 0 && (!prevContacts || contacts == prevContacts)) {
      axios
        .post(
          `http://localhost:3001/api/searchbox`,
          {
            search: searchVal,
            userId: user.id
          },
          {
            headers: tokenObject
          }
        )
        .then(res => {
          handleAllContacts(res.data);
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

  //DELETE CARD
  function deleteContact(userid, first_name, last_name) {
    axios
      .delete("http://localhost:3001/api/deletecontact", {
        headers: {
          Authorization: `Bearer ${user.token}`
        },
        data: {
          userid: userid,
          first_name: first_name,
          last_name: last_name
        }
      })
      .then(data => {
        axios
          .get(`http://localhost:3001/api/getallcontacts?userId=${userid}`, {
            headers: tokenObject
          })
          .then(res => {
            let newObj = res.data;
            //add toggle to each object
            newObj.map(e => {
              if (!e.toggle) {
                e.toggle = false;
              }
            });
            handleAllContacts(newObj);
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }

  return !loggedIn ? (
    <Redirect to="/redirect" />
  ) : (
    <div>
      <AppBar position="static">
        <Toolbar style={styles.appBar}>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <PersonAdd
              onClick={() => {
                handleDialog(true);
              }}
            />
          </IconButton>
          <Typography variant="h6">Welcome, {user.username}!</Typography>
          <Button
            color="inherit"
            onClick={() => {
              handleUser({});
              handleLoggedIn(false);
            }}
          >
            Log Out
          </Button>
        </Toolbar>
      </AppBar>
      {/* SORT AND SEARCH */}
      <Box style={styles.box}>
        <SortContext.Provider
          value={{
            user,
            handleAllContacts,
            handleSort
          }}
        >
          <SortMenu />
        </SortContext.Provider>
        <SearchBar
          onChange={e => handleSearch(e)}
          onRequestSearch={e => handleSearch(e)}
          style={{
            margin: "0 auto",
            maxWidth: 800
          }}
        />
      </Box>
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
                      }}
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  }
                />
                <Collapse in={user.toggle} timeout="auto" unmountOnExit>
                  <CardContent>
                    <Typography>FIRST NAME :{user.first_name}</Typography>
                    <Typography>LAST NAME : {user.last_name}</Typography>
                    <Typography>HOME PHONE :{user.home_phone}</Typography>
                    <Typography>WORK PHONE :{user.work_phone}</Typography>
                    <Typography>EMAIL :{user.email}</Typography>
                    <Typography>CITY :{user.city}</Typography>
                    <Typography>
                      STATE/PROVINCE:{user.state_or_province}
                    </Typography>
                    <Typography>POSTAL CODE :{user.postal_code}</Typography>
                    <Typography>COUNTRY :{user.country}</Typography>
                    <Button
                      onClick={() => {
                        handleDialogEdit(true);
                        handleEditContact(user);
                      }}
                    >
                      EDIT
                    </Button>
                    <Button
                      onClick={() => {
                        deleteContact(
                          user.userid,
                          user.first_name,
                          user.last_name
                        );
                      }}
                    >
                      DELETE
                    </Button>
                  </CardContent>
                </Collapse>
              </Card>
            ))}
      </Box>

      {/* ADD CONTACT DIALOG */}
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

      {/* EDIT CONTACT DIALOG */}
      <Dialog open={expandDialogEdit} onClose={() => handleDialogEdit(false)}>
        <EditContactContext.Provider
          value={{
            handleContact,
            user,
            handleDialogEdit,
            handleAllContacts,
            editContact
          }}
        >
          <EditContactDialog />
        </EditContactContext.Provider>
      </Dialog>
    </div>
  );
}
