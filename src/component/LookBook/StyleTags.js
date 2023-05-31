import {
  Box,
  Button,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import React from "react";
import { bgcolor } from "@mui/system";

const StyleTags = ({ userStyleTags, styleTag, changeStyleTag, handleOpen }) => {
  const styleTagKeys = Object.keys(userStyleTags).sort();
  // console.log(styleTagKeys);
  return (
    <Grid
      container
      maxHeight="65vh"
      width="100%"
      overflow={"scroll"}
      flexDirection="column"
      padding="8px 0"
    >
      <ToggleButtonGroup
        sx={{ width: "100%" }}
        orientation="vertical"
        value={styleTag}
        exclusive
        onChange={changeStyleTag}
      >
        {styleTagKeys.map((tag, idx) => {
          return (
            <ToggleButton
              key={idx}
              value={tag}
              sx={{
                width: "100%",
                justifyContent: "space-between",
                borderRadius: "10px !important",
                border: "1px solid #C9C9C9 !important",
                mb: "8px",
              }}
            >
              <Typography sx={{ fontSize: "0.8vw" }}>{tag}</Typography>
              <Typography
                sx={{
                  textTransform: "none",
                  fontSize: "0.7vw",
                  bgcolor: "black",
                  color: "white",
                  p: "0.2vw",
                  borderRadius: "10px",
                }}
              >
                {userStyleTags[tag]}
              </Typography>
            </ToggleButton>
          );
        })}
      </ToggleButtonGroup>
      <Button
        sx={{
          textTransform: "none",
          color: "black",
          bgcolor: "#a6d4f7",
          borderRadius: "10px",
          boxShadow: 3,
          mt: "8px",
          "&:hover": {
            fontWeight: "bold",
            bgcolor: "#39A9FE",
          },
        }}
        onClick={handleOpen}
      >
        New tag
        <PlaylistAddIcon sx={{ width: "20px", height: "20px" }} />
      </Button>
    </Grid>
  );
};

export default StyleTags;
