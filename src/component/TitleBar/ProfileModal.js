import { Box, Button, Grid, Popover } from "@mui/material";
import { getAuth, signOut } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";
const style = {
  position: "absolute",
  top: 0,
  right: 0,
  width: 300,
  bgcolor: "white",
  color: "white",
  p: 4,
};
const popoverBox = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
};
const btnLogin = {
  textTransform: "none",
  borderTopLeftRadius: "0px",
  borderTopRightRadius: "0px",
  color: "white",
  bgcolor: "#656565",
  height: "48px",
  fontWeight: "bold",
  mb: "8px",
};
const btnCraeteAccount = {
  textTransform: "none",
  borderBottomLeftRadius: "0px",
  borderBottomRightRadius: "0px",
  color: "white",
  bgcolor: "#656565",
  height: "48px",
  fontWeight: "bold",
};
const ProfileModal = ({ isLoggedIn, anchorEl, open, handleClose }) => {
  const navigate = useNavigate();
  const signOutClick = async () => {
    const auth = getAuth();
    await signOut(auth)
    handleClose()
    navigate("/")
  };
  return (
    <Popover
      PaperProps={{
        style: { borderRadius: 0 },
      }}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <Grid
        container
        sx={{
          padding: 1,
          width: "200px",
          bgcolor: "#393939",
        }}
      >
        {/* {isLoggedIn ? ( */}
          <Box sx={popoverBox}>
            <Button>Profile</Button>
            <Button
              onClick={signOutClick}
            >
              Logout
            </Button>
          </Box>
        {/* ) : (
          <Box sx={popoverBox}>
            <Button href="/" sx={btnLogin}>
              Login
            </Button>
            <Button href="/joinMembership" sx={btnCraeteAccount}>
              Create account
            </Button>
          </Box>
        )} */}
      </Grid>
    </Popover>
  );
};

export default ProfileModal;
