import { Divider, InputBase, Paper } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
const SearchBar = ({ placeholder }) => {
  return (
    <Paper
      sx={{
        display: "flex",
        alignItems: "center",
        mb: 3,
        bgcolor: "lightgray",
      }}
    >
      <SearchIcon sx={{ m: 1 }} />
      <Divider orientation="vertical" variant="middle" flexItem />
      <InputBase sx={{ ml: 1}} placeholder={placeholder} />
    </Paper>
  );
};

export default SearchBar;
