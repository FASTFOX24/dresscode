import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Profile = ({ onChangeInit }) => {
  const auth = getAuth();
  const navigate = useNavigate();
  const onLogOutClick = () => {
    signOut(auth);
    onChangeInit();
    navigate("/");
  };
  return (
    <Grid>
      <Box>프로필</Box>
      <Button onClick={onLogOutClick}>
        <Typography>Log Out</Typography>
      </Button>
    </Grid>
  );
};

export default Profile;
