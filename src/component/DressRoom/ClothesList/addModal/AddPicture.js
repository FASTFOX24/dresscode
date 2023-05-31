import {
  Box,
  Button,
  ButtonBase,
  Grid,
  styled,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import RefreshIcon from "@mui/icons-material/Refresh";
import "./AddPicture.css";
import ImageCropper from "../../ImageCropper";
const buttonStyle = {
  color: "#888888",
  bgcolor: "#EDEDED",
  border: "1px #A9A9A9 dashed",
  borderRadius: "10px",
  textTransform: "none",
  width: "246px",
  height: "246px",
  "&:hover": {
    color: "white",
    bgcolor: "#BABABA",
  },
};
const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  height: 200,
  [theme.breakpoints.down("sm")]: {
    width: "100% !important",
    height: 100,
  },
  "&:hover, &.Mui-focusVisible": {
    zIndex: 1,
    "& .MuiImageBackdrop-root": {
      opacity: 0.15,
    },
    "& .MuiImageMarked-root": {
      opacity: 0,
    },
    "& .MuiTypography-root": {
      border: "4px solid currentColor",
    },
  },
}));
const ImageSrc = styled("span")({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: "cover",
  backgroundPosition: "center 40%",
});
const AddPicture = ({ imgData, setImgData }) => {
  const [inputIdx, setInputIdx] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [cropperOpen, setCropperOpen] = useState(false);
  const images = Object.keys(imgData).filter(
    (e) => e === "img_0" || e === "img_1"
  );
  const imageSelect = (event, idx) => {
    setInputIdx(idx); 
    setImageSrc(URL.createObjectURL(event.target.files[0]));
    setCropperOpen(true); 
  };
  const handleImgDate = (imageUrl, uploadUrl) => {
    setImgData({
      ...imgData,
      [`img_${inputIdx}`]: imageUrl,
      [`uploadUrl_${inputIdx}`]: uploadUrl,
    });
  };
  return (
    <Grid
      container
      width="500px"
      flexDirection="column"
      justifyContent="flex-end"
    >
      <Box sx={{ display: "flex" }}>
        {images.map((e, idx) => {
          return (
            <Box
              key={`dressImage${idx}`}
              className={e === "img_0" ? "boxStlye_img img1" : "boxStlye_img"}
            >
              <Typography>{e === "img_0" ? "Front" : "Back"}</Typography>
              {imgData[e] ? (
                <Box sx={{ width: "246px", height: "246px" }}>
                  <ImageButton
                    variant="contained"
                    component="label"
                    focusRipple
                  >
                    <input
                      hidden
                      accept="image/*"
                      type="file"
                      onChange={(event) => {
                        setInputIdx(idx);
                        imageSelect(event, idx);
                      }}
                    />
                    <ImageSrc
                      style={{
                        backgroundImage: `url(${imgData[e]})`,
                        border: "1px #A9A9A9 dashed",
                        borderRadius: "10px",
                        width: "246px",
                        height: "246px",
                      }}
                    />
                  </ImageButton>
                </Box>
              ) : (
                <Button sx={buttonStyle} variant="contained" component="label">
                  Click to upload
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={(event) => {
                      setInputIdx(idx);
                      imageSelect(event, idx);
                    }}
                  />
                </Button>
              )}
            </Box>
          );
        })}
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          mt: "4px",
          mr: "2px",
        }}
      >
        <RefreshIcon sx={{ width: "15px", height: "15px", color: "gray" }} />
        <Typography
          sx={{
            color: "gray",
            textTransform: "none",
            fontSize: "12px",
            ml: "2px",
            textAlign: "right",
          }}
        >
          Click image to reupload
        </Typography>
      </Box>
      <ImageCropper
        imageSrc={imageSrc}
        cropperOpen={cropperOpen}
        handleCropper={setCropperOpen}
        handleImage={setImageSrc}
        imageSelect={imageSelect}
        handleImgDate={handleImgDate}
      />
    </Grid>
  );
};
export default AddPicture;
