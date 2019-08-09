import React, { useState, useContext } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import { SortContext } from "./../context/UserContext";

export default function SortMenu() {
  const [anchorEl, setAnchorEl] = useState(null);

  const { user, handleAllContacts, handleSort } = useContext(SortContext);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        SORT BY
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            handleSort("DEFAULT");
          }}
        >
          DEFAULT
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            handleSort("ASC");
          }}
        >
          A-Z
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            handleSort("DESC");
          }}
        >
          Z-A
        </MenuItem>
      </Menu>
    </div>
  );
}
