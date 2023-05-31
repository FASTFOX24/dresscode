import { Box, Button, IconButton, Modal, Typography } from "@mui/material";
import Cropper from "cropperjs";
import React, { useState } from "react";
import { uuidv4 } from "@firebase/util";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import FilterIcon from "@mui/icons-material/Filter";
import UploadIcon from "@mui/icons-material/Upload";
import CloseIcon from "@mui/icons-material/Close";
import RefreshIcon from "@mui/icons-material/Refresh";
import "cropperjs/dist/cropper.css";
import "./ImageCropper.css";

const ImageCropper = ({
  imageSrc,
  cropperOpen,
  handleCropper,
  handleImage,
  imageSelect,
  handleImgDate,
}) => {
  const [cropper, setCropper] = useState(null);
  const handleImageReady = (event) => {
    if (cropper !== null) {
      cropper.destroy();
    }
    const cropperInstance = new Cropper(event.target, {
      aspectRatio: 1,
      autoCropArea: 1,
      dragMode: "move",
    });
    setCropper(cropperInstance);
  };
  function dataURItoBlob(dataURI) {
    const byteString = atob(dataURI.split(",")[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: "image/jpeg" });
  }
  function blobToFile(blob, fileName) {
    // firebase에 crop된 이미지를 업로드하기 위한 데이터형태로 가공하는 함수
    const file = new File([blob], fileName, { type: "image/jpeg" });
    return file;
  }
  const handleCrop = () => {
    const croppedCanvas = cropper.getCroppedCanvas().toDataURL();
    const blob = dataURItoBlob(croppedCanvas);
    const imageUrl = URL.createObjectURL(blob); // <img>를 위한 URL
    const file = blobToFile(blob, uuidv4()); //firebase에 업로드하기 위한 객체
    handleImgDate(imageUrl, file);
    handleCropper(false);
  };
  return (
    <Modal
      open={cropperOpen}
      onClose={() => {
        handleCropper(false);
        handleImage(null);
      }}
    >
      <Box className="cropper_Modal">
        <Box
          sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
        >
          <IconButton sx={{ width: "30px" }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box sx={{ display: "flex", width: "500px", height: "500px" }}>
          <img src={imageSrc} onLoad={handleImageReady} />
        </Box>
        <Box
          sx={{ display: "flex", width: "100%", justifyContent: "flex-end" }}
        >
          <Button
            onClick={() => {
              cropper.reset();
            }}
            className="cropper_Btn cropper_Btn_reset_reupload"
          >
            <RefreshIcon sx={{ width: "15px", mr: "4px" }} />
            <Typography sx={{ fontWeight: 200, fontSize: "14px" }}>
              Reset
            </Typography>
          </Button>
          <Button
            className="cropper_Btn cropper_Btn_reset_reupload"
            onClick={() => {
              cropper.rotate(-90);
            }}
          >
            <RotateLeftIcon />
          </Button>
          <Button
            className="cropper_Btn cropper_Btn_reset_reupload"
            onClick={() => {
              cropper.rotate(90);
            }}
          >
            <RotateRightIcon />
          </Button>
          <Button
            className="cropper_Btn cropper_Btn_reset_reupload"
            component="label"
          >
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(event) => {
                imageSelect(event);
                cropper.clear();
              }}
            />
            <UploadIcon sx={{ width: "16px", mr: "4px" }} />
            <Typography sx={{ fontWeight: 200, fontSize: "14px" }}>
              Reupload
            </Typography>
          </Button>
        </Box>
        <Button className="cropper_Btn corrper_Btn_crop" onClick={handleCrop}>
          Crop
        </Button>
      </Box>
    </Modal>
  );
};

export default ImageCropper;
