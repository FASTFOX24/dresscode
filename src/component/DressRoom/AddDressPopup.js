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
import { uuidv4 } from "@firebase/util";
import React, { forwardRef, useState } from "react";
import { auth, db } from "../../firebase/firebase";
import { getStorage, ref } from "firebase/storage";
import { collection, doc, setDoc } from "firebase/firestore";
import AddPicture from "./ClothesList/addModal/AddPicture";
import CategoryCheckBox from "./ClothesList/addModal/CategoryCheckBox";
import MoreInfo from "../../reuse/MoreInfo";
import { upload } from "../../apis/uploadBytes";

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

const AddDressPopup = ({ open, handleClose, selectedClothes }) => {
  const user = auth.currentUser;
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
    img_0: selectedClothes?.imageUrl_1 || null,
    uploadUrl_0: null,
    img_1: selectedClothes?.imageUrl_2 || null,
    uploadUrl_1: null,
  });
  const [clothesData, setClothesData] = useState({
    season: selectedClothes?.season || [],
    part: selectedClothes?.part || null,
    brand: selectedClothes?.brand || null,
    price: selectedClothes?.price || null,
    details: selectedClothes?.details || null,
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
  const uploadClothes = async () => {
    const { uploadUrl_0, uploadUrl_1 } = imgData;
    const { season, part, brand, price, details } = clothesData;
    if (!uploadUrl_0 || season.length === 0 || part === "") {
      setAlert({ ...alert, alertOpen: true });
    }
    if (uploadUrl_0 && season.length !== 0 && part !== "") {
      const seasonFilter = ["Spring", "Summer", "Fall", "Winter"];
      const sortedSeason = season.sort((a, b) => {
        return seasonFilter.indexOf(a) - seasonFilter.indexOf(b);
      });
      const storage = getStorage();
      const spaceRef_1 = ref(storage, `${user.uid}/clothes/${uuidv4()}`);
      const spaceRef_2 = ref(storage, `${user.uid}/clothes/${uuidv4()}`);
      const newClothes = {
        docName: uuidv4(),
        favorite: false,
        id: user.uid,
        imageUrl_1: await upload(spaceRef_1, uploadUrl_0),
        imageUrl_2: uploadUrl_1 ? await upload(spaceRef_2, uploadUrl_1) : null,
        season: sortedSeason,
        part: part,
        brand: brand,
        price: price,
        details: details,
      };
      const collectionRef = collection(db, "clothes");
      await setDoc(doc(collectionRef, newClothes.docName), newClothes).catch(
        (err) => {
          console.log(err);
        }
      );
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
            <Button sx={buttonStyle} onClick={uploadClothes}>
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
      </Dialog>
    </>
  );
};

export default AddDressPopup;
