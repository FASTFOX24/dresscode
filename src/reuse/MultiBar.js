import { Box, Button, Grid, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import React, { useState } from "react";
import ProfileModal from "../component/TitleBar/ProfileModal";
import "./MultiBar.css";
import { Link, NavLink } from "react-router-dom";
const buttonStyle = {
  textTransform: "none",
  color: "white",
  p: 0,
  "&:hover": {
    fontWeight: 700,
    bgcolor: "#191919",
    color: "#ff5722",
  },
};
const MultiBar = ({ isLoggedIn, userInfo }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  return (
    <Grid container className="navBar">
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Typography variant="h3" className="title">
            DressCode
          </Typography>
        </Link>
      </Box>
      <Box
        sx={{
          display: "flex",
          mr: 2,
          width: 300,
          justifyContent: "space-between",
        }}
      >
        <NavLink
          to="/dressroom"
          className="navButton none"
          activeclassname="navButton active"
        >
          <Typography>DressRoom</Typography>
        </NavLink>
        <NavLink
          to="/lookbook"
          className="navButton none"
          activeclassname="navButton active"
        >
          <Typography>StyleList</Typography>
        </NavLink>
        {isLoggedIn ? (
          <Button sx={buttonStyle} onClick={handleClick}>
            <AccountCircleIcon sx={{ width: "23px", height: "23px" }} />
            <Typography sx={{ fontSize: "15px", ml: "4px" }}>
              {userInfo.nickname ? userInfo.nickname : "Unknown"}
            </Typography>
          </Button>
        ) : (
          <Button sx={buttonStyle} href="/">
            <AccountCircleIcon sx={{ width: "23px", height: "23px" }} />
            <Typography sx={{ ml: "4px" }}>Login</Typography>
          </Button>
        )}
        <ProfileModal
          isLoggedIn={isLoggedIn}
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          handleClose={handleClose}
        />
      </Box>
    </Grid>
  );
};

export default MultiBar;
