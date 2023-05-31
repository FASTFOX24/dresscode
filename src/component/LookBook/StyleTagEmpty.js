import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
const StyleTagEmpty = ({ styleTag, handleOpen }) => {
  return (
    <Box sx={{display:"flex",height:"100%", width:"100%"}} >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          border: "1px dashed #C9C9C9",
          borderRadius: "16px",
          minWidth: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "14px",
            fontWeight: "bold",
            color: "gray",
          }}
        >
          Tag list is empty. <br />
          Create your own tag!
        </Typography>
        <Button
          sx={{
            mt: "16px",
            paddingLeft: 2,
            paddingRight: 2,
            mt: 4,
            borderRadius: "99px",
            textTransform: "none",
            color: "black",
            bgcolor: "#a6d4f7",
            boxShadow: 3,
            "&:hover": {
              fontWeight: 600,
              bgcolor: "#39A9FE",
            },
          }}
          onClick={handleOpen}
        >
          New tag
          <PlaylistAddIcon sx={{ width: "20px", ml: "4px" }} />
        </Button>
      </Box>
    </Box>
  );
};

export default StyleTagEmpty;
