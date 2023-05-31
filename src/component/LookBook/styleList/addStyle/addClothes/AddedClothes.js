import {
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import React from "react";
const imgStyle = {
  height: "95px",
  width: "95px",
};
const AddedClothes = ({ addedClothes, deleteClick }) => {
  return (
    <Box sx={{ display: "flex", overflow: "scroll", width: "100%" }}>
      {addedClothes.length ? (
        addedClothes.map((e, idx) => {
          return (
            <Box
              key={idx}
              sx={{
                display: "flex",
                mr: "12px",
                mt: "12px",
              }}
            >
              <img src={`${e.url}`} style={imgStyle} />
              <IconButton
                sx={{ p: 0, bgcolor: "black", height: 0, position: "relative" }}
                onClick={() => {
                  deleteClick(e);
                }}
              >
                <ClearIcon
                  sx={{
                    width: "20px",
                    height: "20px",
                    bgcolor: "#FFA5A5",
                    color: "#575757",
                    borderRadius: "50%",
                    position: "absolute",
                    top: "-7px",
                    right: "-7px",
                  }}
                />
              </IconButton>
            </Box>
          );
        })
      ) : (
        <Box
          sx={{
            display:"flex",
            height: "95px",
            mt: "12px",
            width: "100%",
            border: "1px dashed #888888",
            borderRadius: "10px",
            alignItems: "center",
            justifyContent: "center",
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
            No clothes are selected.
            <br /> Choose the clothes used for styling!
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default AddedClothes;
