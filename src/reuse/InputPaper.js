import { InputBase, Paper } from "@mui/material";
import React from "react";

const InputPaper = ({ placeholder, changeBrand, changePrice }) => {
  return (
    <Paper
      sx={{
        display: "flex",
        alignItems: "center",
        mb: 2,
        bgcolor: "lightgray",
        width:"50%",
        height:40
      }}
    >
      {/* <Divider orientation="vertical" variant="middle" flexItem /> */}
      <InputBase
        sx={{ ml: 1}}
        placeholder={placeholder}
        onChange={
          placeholder === "Brand"
            ? (ev) => {
                changeBrand(ev.target.value);
              }
            : (ev) => {
                changePrice(ev.target.value);
              }
        }
      />
    </Paper>
  );
};

export default InputPaper;
