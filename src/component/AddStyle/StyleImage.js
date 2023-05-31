import { Box, Button, ButtonBase, Grid, IconButton } from "@mui/material";
import { styled } from "@mui/system";
import React, { useState } from "react";
import ReuploadIcon from "../../reuse/ReuploadIcon";
const emptySpace = {
  display: "flex",
  flexDirection: "column",
  border: "1px solid #C9C9C9",
  width: "30vw",
  maxWidth: "420px",
  height: "40vw",
  maxHeight: "560px",
};
const subImage = {
  flex: "1 0 0",
  textTransform: "none",
  color: "#999999",
  borderRight: "1px solid #C9C9C9",
  borderRadius: "0",
  "&:hover": {
    bgcolor: "#A9A9A9",
    color: "white",
  },
};
const subImage2 = {
  flex: "1 0 0",
  textTransform: "none",
  color: "#999999",
  borderRadius: "0",
  "&:hover": {
    bgcolor: "#A9A9A9",
    color: "white",
  },
};
const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  [theme.breakpoints.down("sm")]: {},
  "&:hover, &.Mui-focusVisible": {
    zIndex: 1,
    "& .MuiImageBackdrop-root": {
      opacity: 0.15,
    },
    "& .MuiImageMarked-root": {
      opacity: 0,
    },
  },
}));
const ImageSrc = styled("span")({
  marginTop: "8px",
  marginRight: "8px",
  backgroundSize: "cover",
});
const StyleImage = ({ styleImage, handleStyleImage }) => {
  return (
    <Box sx={emptySpace}>
      {/* // <ImageButton variant="contained" component="label" focusRipple>
        //</ImageButton>   <input
        //     name="image1"
        //     hidden
        //     accept="image/*"
        //     type="file"
        //     onChange={(ev) => {
        //       handleStyleImage(0, ev.target.files);
        //     }}
        //   />
        //   <ImageSrc
        //     style={{
        //       backgroundImage: `url(${styleImage[0]})`,
        //       width: "40vw",
        //       height: "60vw",
        //     }}
        //   />
        // </ImageButton> */}
      <Box sx={{ display: "flex", flex: "3 0 0", bgcolor: "#EDEDED" }}>
        {styleImage.mainImage ? (
          <ImageButton variant="contained" component="label" focusRipple>
            <input
              id="mainImage"
              name="mainImage"
              hidden
              accept="image/*"
              type="file"
              onChange={handleStyleImage}
            />
            <ImageSrc
              style={{
                backgroundImage: `url(${styleImage.mainImage})`,
                // width: "40vw",
                // height: "60vw",
              }}
            />
          </ImageButton>
        ) : (
          <Button
            sx={{
              width: "100%",
              textTransform: "none",
              color: "gray",
              fontSize: "15px",
              "&:hover": {
                bgcolor: "#A9A9A9",
                color: "white",
              },
            }}
            component="label"
          >
            <input
            name="mainImage"
              hidden
              accept="image/*"
              type="file"
              onChange={handleStyleImage}
            />
            Uplaod style image.
          </Button>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          flex: "1 0 0",
          borderTop: "1px solid #C9C9C9",
          bgcolor: "#EDEDED",
        }}
      >
        {styleImage.subImage.map((el, idx) => {
          return el !== "subImage" ? (
            <ImageButton variant="contained" component="label" focusRipple>
              <input
                name="subImage"
                hidden
                accept="image/*"
                type="file"
                onChange={handleStyleImage}
              />
              <ImageSrc
                style={{
                  backgroundImage: `url(${styleImage.subImage[idx]})`,
                  // width: "40vw",
                  // height: "60vw",
                }}
              />
            </ImageButton>
          ) : (
            <Button
              key={"subImage" + idx}
              sx={idx === 2 ? subImage2 : subImage}
              component="label"
            >
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={handleStyleImage}
              />
              Picture{idx + 1}
            </Button>
          );
        })}
      </Box>
    </Box>
  );
};

export default StyleImage;
