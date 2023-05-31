import { Divider, IconButton, InputBase, Paper } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import CheckIcon from "@mui/icons-material/Check";
const TypingField = ({ open, changeListName, addList }) => {
  return open ? (
    <Box sx={{ display: "flex", justifyContent: "space-around", mt: 1, mb: 1 }}>
      <Paper
        sx={{
          display: "flex",
          alignItems: "center",
          bgcolor: "lightgray",
          width: "100%",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="List Name"
          onChange={changeListName}
        />
        <Divider orientation="vertical" variant="middle" flexItem />
        <IconButton onClick={addList}>
          <CheckIcon />
        </IconButton>
      </Paper>
    </Box>
  ) : (
    <></>
  );
};

export default TypingField;
