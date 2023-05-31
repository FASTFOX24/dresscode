import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import Cropper from 'cropperjs';
const imgStyle = {
  minWidth:"80px",
  height: "188px",
};
const selectedImgStyle = {
  width: "188px",
  height: "188px",
  opacity: 0.4,
};
const SearchResult = ({ list, addedClothes, handleClothes }) => {
  return (
    <Grid container border="1px solid #888888" borderRadius="10px" flexWrap="wrap" maxHeight="400px" overflow={"scroll"} >
      {list.length ? (
        list.map((e, idx) => {
          if (addedClothes.includes(e)) {
            return (
              <Box
                key={idx}
                sx={{
                  display: "flex",
                  pl: "6px",
                  pr: "6px",
                  pb: "12px",
                  position: "relative",
                }}
                onClick={() => {
                  handleClothes(e);
                }}
              >
                <img src={`${e.url}`} style={selectedImgStyle} />
                <Box
                  sx={{
                    width: "188px",
                    height: "188px",
                    position: "absolute",
                    top: 0,
                    left: "6px",
                    bgcolor: "black",
                    opacity: 0.6,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "20px",
                      position: "absolute",
                      left: "50%",
                      top: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    Selected
                  </Typography>
                </Box>
              </Box>
            );
          } else {
            return (
              <Box
                key={idx}
                sx={{ display: "flex", pl: "6px", pr: "6px", pb: "12px",flex:"1 0 0"}}
                onClick={() => {
                  handleClothes(e);
                }}
              >
                <img src={`${e.url}`} style={imgStyle} />
              </Box>
            );
          }
        })
      ) : (
        <Box
          sx={{
            display: "flex",
            ml: "6px",
            mr: "6px",
            border: "1px dashed #888888",
            borderRadius: "10px",
            height: "200px",
            width: "100%",
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
            No search results found.
            <br /> Add new clothes!!
          </Typography>
        </Box>
      )}
    </Grid>
  );
};

export default SearchResult;
