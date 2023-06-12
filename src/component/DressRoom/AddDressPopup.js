import {
  Alert,
  AppBar,
  Box,
  Button,
  Dialog,
  IconButton,
  Slide,
  Snackbar,
  Toolbar,
  Typography,
} from "@mui/material";
import "./ImageCropper.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React, { forwardRef, useState } from "react";
import AddPicture from "./ClothesList/addModal/AddPicture";
import CategoryCheckBox from "./ClothesList/addModal/CategoryCheckBox";
import MoreInfo from "../../reuse/MoreInfo";
import { backDropMessages } from "../../shared/MSGS";
import LoadingBackDrop from "../../reuse/LoadingBackDrop";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const buttonStyle = {
  width: "100px",
  bgcolor: "#ff5722",
  color: "black",
  textTransform: "none",
  "&:hover": {
    bgcolor: "#ff5722",
  },
};
const AddDressPopup = ({
  open,
  handleClose,
  selectedClothes,
  handleClothesData,
}) => {
  const [backdrop, setBackDrop] = useState(false);
  const [alert, setAlert] = useState({
    alertOpen: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, alertOpen } = alert;
  const closeAlert = () => {
    setAlert({ ...alert, alertOpen: false });
  };
  const [imgData, setImgData] = useState({
    img_0: selectedClothes?.data.imageUrl_1 || null,
    uploadUrl_0: null,
    img_1: selectedClothes?.data.imageUrl_2 || null,
    uploadUrl_1: null,
  });
  const [clothesData, setClothesData] = useState({
    season: selectedClothes?.data.season || [],
    part: selectedClothes?.data.part || null,
    brand: selectedClothes?.data.brand || null,
    price: selectedClothes?.data.price || null,
    details: selectedClothes?.data.details || null,
  });
  const resetAll = () => {
    setImgData({
      img_0: null,
      uploadUrl_0: null,
      img_1: null,
      uploadUrl_1: null,
    });
    setClothesData({
      season: [],
      part: null,
      brand: null,
      price: null,
      details: null,
    });
  };
  const clickSaveBtn = async () => {
    const { img_0, uploadUrl_0 } = imgData;
    const { season, part } = clothesData;
    if ((!img_0 && !uploadUrl_0) || season.length === 0 || part === "") {
      setAlert({ ...alert, alertOpen: true });
      return;
    } else {
      setBackDrop(true);
      await handleClothesData(imgData, clothesData, selectedClothes?.id);
      setBackDrop(false);
      resetAll();
      handleClose();
    }
  };
  return (
    <>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              bgcolor: "#191919",
            }}
          >
            <IconButton
              onClick={() => {
                handleClose();
                resetAll();
              }}
            >
              <ArrowBackIcon sx={{ color: "white" }} />
            </IconButton>
            <Button sx={buttonStyle} onClick={clickSaveBtn}>
              <Typography>Save</Typography>
            </Button>
          </Toolbar>
        </AppBar>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={alertOpen}
            autoHideDuration={6000}
            onClose={closeAlert}
          >
            <Alert severity="error" variant="filled">
              The front image, Season and Category are required!
            </Alert>
          </Snackbar>
          <AddPicture imgData={imgData} setImgData={setImgData} />
          <CategoryCheckBox
            clothesData={clothesData}
            setClothesData={setClothesData}
          />
          <MoreInfo clothesData={clothesData} setClothesData={setClothesData} />
        </Box>
        <LoadingBackDrop
          backdrop={backdrop}
          loadingMessage={backDropMessages.uploading}
        />
      </Dialog>
    </>
  );
};

export default AddDressPopup;
