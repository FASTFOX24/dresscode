import { Button } from "@mui/material";
import React from "react";
const buttonStyle = {
  width: 428,
  mt:1.5,
  color: "black",
  fontWeight: "bold",
  bgcolor: "lightgray",
  textTransform: "capitalize",
  "&:hover": {
    bgcolor: "darkgray",
  },
};
const EditButton = ({ updating, buttonControl }) => {
  return updating ? (
    <Button
      sx={buttonStyle}
      onClick={() => {
        buttonControl("complete");
      }}
    >
      Complete
    </Button>
  ) : (
    <Button
      sx={buttonStyle}
      onClick={() => {
        buttonControl("update");
      }}
    >
      Update
    </Button>
  );
};

export default EditButton;
