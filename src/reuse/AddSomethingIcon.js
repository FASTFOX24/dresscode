import React from "react";
import AddIcon from "@mui/icons-material/Add";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import { Box } from "@mui/material";

const AddSomethingIcon = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <AddIcon
        sx={{
          positon: "absolute",
          transform: "translate(30%, 0%)",
          width: 17,
          height: 17,
          color: "black",
        }}
      />
      <CheckroomIcon
        sx={{
          positon: "absolute",
          transform: "translate(-20%,0%)",
          width: 23,
          height: 23,
          color: "black",
        }}
      />
    </Box>
  );
};

export default AddSomethingIcon;
