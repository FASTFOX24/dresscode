import React, { useState } from "react";
import { IconButton, InputBase, Paper } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckIcon from "@mui/icons-material/Check";
const style = {
  p: "2px 4px",
  display: "flex",
  alignItems: "center",
  width: 250,
  height: 35,
};
const InputBaseStyle = {
  width: 200,
};

const JoinMembershipTfield = ({ name, onChange,checkNickname, }) => {
  const [type, setType] = useState(false);
  const onVisableClick = () => {
    setType(!type);
  };
  if (name === "nickname") {
    return (
      <Paper sx={style}>
        <InputBase sx={InputBaseStyle} name={name} onChange={onChange} />
        <IconButton onClick={checkNickname}>
            <CheckIcon/>
        </IconButton>
      </Paper>
    );
  } else {
    return (
      <Paper sx={style}>
        <InputBase
          sx={InputBaseStyle}
          name={name}
          type={
            (name === "password" || name === "confirmPassword") &&
            name !== "email" &&
            type === false
              ? "password"
              : "text"
          }
          onChange={onChange}
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
  }
};

export default JoinMembershipTfield;
