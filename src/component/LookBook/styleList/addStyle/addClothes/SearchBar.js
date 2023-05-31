import React from "react";
import { Box, Divider, IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = () => {
  return (
    <Paper sx={{ bgcolor: "lightgray", width: 250, mb:5 }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search Brand"/>
        <Divider orientation="vertical" variant="middle" flexItem />
        <IconButton>
          <SearchIcon />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default SearchBar;
