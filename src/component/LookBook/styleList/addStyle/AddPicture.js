import React from "react";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { Box, IconButton } from "@mui/material";
const style = {
  display: "flex",
  width: 450,
  height: "100%",
  justifyContent: "center",
  alignItems: "center",
  border: "1px solid black",
  borderRadius: 4,
};
const imgStyle = {
  width: "100%",
  height: "100%",
  borderRadius: 4,
};
const AddPicture = ({ url, setPictureUrl }) => {
  return url === "" ? (
    <Box sx={style}>
      <IconButton component="label" sx={{ width: 300, height: 300 }}>
        <CameraAltIcon sx={{ width: 50, height: 50, color: "black" }} />
        <input hidden accept="image/*" type="file" onChange={setPictureUrl} />
      </IconButton>
    </Box>
  ) : (
    <Box sx={{ display: "flex", width: 450, height: 580 }}>
      <img src={url} style={imgStyle} />
    </Box>
  );
};

export default AddPicture;
