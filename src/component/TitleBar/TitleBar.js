import { Box, Button, IconButton, Typography } from "@mui/material";
import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
const buttonStyle = {
  color: "black",
  height: "100%",
  textTransform: "capitalize",
  "&:hover": {
    color: "white",
    bgcolor: "gray",
    fontWeight: "bold",
  },
};
const TitleBar = ({ clothesList, styleList }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "black",
          height: 80,
          borderBottom: "1px solid white",
        }}
      >
        <Box sx={{ width: 80 }} />
        <Button href="/" sx={{ padding: 4 }}>
          <Typography
            sx={{ fontWeight: "bold", color: "white", fontSize: "25px" }}
          >
            DressCode
          </Typography>
        </Button>
        <IconButton href="/profile" sx={{ color: "white", width: 80 }}>
          <PersonIcon />
        </IconButton>
      </Box>
      <Box
        sx={{
          display: "flex",
          bgcolor: "gray",
          width: "100vw",
          height: 50,
          justifyContent: "center",
        }}
      >
        <Link to="/dressroom" style={{ textDecoration: "none" }}>
          <Button sx={buttonStyle}>
            {"DressRoom " + "(" + `${clothesList.length}` + ")"}
          </Button>
        </Link>
        <Link to="/lookbook" style={{ textDecoration: "none" }}>
          <Button sx={buttonStyle}>
            {"Style " + "(" + `${styleList.length}` + ")"}
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default TitleBar;
