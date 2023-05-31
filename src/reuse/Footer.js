import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
const buttonStyle = { color: "white" };
const Footer = ({}) => {
  return (
    <Grid container flexDirection={"column"} bgcolor={"black"} padding={2} >
      <Box sx={{ display: "flex" }}>
        <Typography sx={{ textTransform: "capitalize", padding: 1,fontWeight:"bold",color:"white" }}>
          DressCode
        </Typography>
      </Box>
      <Box sx={{ display: "flex" }}>
        <Button variant="text" sx={buttonStyle}>개인정보처리방침</Button>
        <Button variant="text" sx={buttonStyle}>이용약관</Button>
      </Box>
    </Grid>
  );
};

export default Footer;
