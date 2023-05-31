import React from "react";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { IconButton } from "@mui/material";
const style = {
  width: "100%",
  height: "100%",
};
const editStyle = {
  width: "100%",
  height: "100%",
  opacity: 0.5,
};
const buttonStyle = {
  positon: "absolute",
  left: "-50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
  height: 150,
  width: 150,
};
const Picture = ({ selectedStyle, editMode }) => {
  return (
    <>
      <img style={editMode ? editStyle : style} src={selectedStyle.url} />
      {editMode ? (
        <IconButton component="label" sx={buttonStyle}>
          <input hidden accept="image/*" type="file" />
          <PhotoCamera sx={{ color: "black", width: 50, height: 50 }} />
        </IconButton>
      ) : (
        <></>
      )}
    </>
  );
};

export default Picture;
