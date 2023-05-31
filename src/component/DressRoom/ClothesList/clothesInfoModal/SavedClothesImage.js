import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";

const boxStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  width: "240px",
  height: "240px",
  border: "1px dashed #A9A9A9",
  bgcolor: "#EDEDED",
};
const imgStyle = {
  width: "240px",
  height: "240px",
};
const informationText = {
  display: "flex",
  textAlign: "center",
  fontSize: "14px",
  color: "#888888",
  fontWeight: "bold",
};
const iconStyle = {
  width: "45px",
  height: "45px",
  color: "#888888",
  mb: "16px",
};
const SavedClothesImage = ({ selectedClothes }) => {
  const { imageUrl_1, imageUrl_2 } = selectedClothes;
  const imageArr = [imageUrl_1, imageUrl_2];
  return (
    <Grid container justifyContent="space-between" mt="30px">
      {imageArr.map((image, idx) => {
        return image ? (
          <Box
            key={"dressImage" + `${idx}`}
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <img src={image} style={imgStyle} />
          </Box>
        ) : (
          <Box key={"dressImage" + `${idx}`} sx={boxStyle}>
            <SentimentDissatisfiedIcon sx={iconStyle} />
            <Typography sx={informationText}>
              이미지가 비어있습니다. <br /> 이미지를 추가해보세요!!
            </Typography>
          </Box>
        );
      })}
    </Grid>
  );
};

export default SavedClothesImage;
