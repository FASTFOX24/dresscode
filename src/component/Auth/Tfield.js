import React, { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { Divider, IconButton, InputBase, Paper } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

const Tfield = ({ name, onChange }) => {
  const [type, setType] = useState(false);
  const onVisableClick = () => {
    setType(!type);
  };
  return (
    <Paper
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: 300,
        height: 40,
      }}
    >
      {name === "id" ? <PersonIcon /> : <LockOpenIcon />}
      <Divider orientation="vertical" variant="middle" flexItem />
      <InputBase
        name={name}
        type={ name ==="password" && type === false ? "password" : "text"}
        onChange={onChange}
        sx={{ ml: 1, flex: 1 }}
      />
      {name === "password" ? (
        <IconButton onClick={onVisableClick}>
          <VisibilityIcon />
        </IconButton>
      ) : (
        <></>
      )}
    </Paper>
  );
};

export default Tfield;
