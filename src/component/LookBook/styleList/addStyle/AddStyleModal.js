import {
  Box,
  Button,
  Divider,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import AddPicture from "./AddPicture";
import AddClothesModal from "./addClothes/AddClothesModal";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { uuidv4 } from "@firebase/util";
import StyleDetails from "./StyleDetails";
import IncludedClothes from "./IncludedClothes";
import { collection, doc, setDoc } from "firebase/firestore";
import { auth, db, storage } from "../../../../firebase/firebase";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  height: 700,
  bgcolor: "white",
  borderRadius: 4,
};
const buttonStyle = {
  width: "80%",
  color: "black",
  fontWeight: "bold",
  bgcolor: "gray",
  "&:hover": {
    backgroundColor: "gray",
    color: "black",
  },
};
const AddStyleModal = ({ AddModal, onClose, clothesList, selectedListName }) => {
  const [url, setUrl] = useState("");
  const [uploadUrl, setUploadUrl] = useState("");
  const [openClothesModal, setOpenClothesModal] = useState(false);
  const [styleSeason, setStyleSeason] = useState([]);
  const [includedClothes, setIncludedClothes] = useState([]);
  const user = auth.currentUser;
  const handleOpen = () => {
    setOpenClothesModal(true);
  };
  const handleClose = () => {
    setIncludedClothes([]);
    setOpenClothesModal(false);
  };
  const handleComplete = (addedClothes) => {
    console.log("start");
    
    setIncludedClothes(...[addedClothes]);
    console.log(includedClothes);
    setOpenClothesModal(false);
  };
  const setPictureUrl = (event) => {
    const {
      target: { files },
    } = event;
    setUrl(URL.createObjectURL(files[0]));
    setUploadUrl(files[0]);
  };
  const addStyleDetails = (value) => {
    if (styleSeason.includes(value)) {
      const index = styleSeason.indexOf(value);
      styleSeason.splice(index, 1);
    } else {
      styleSeason.push(value);
    }
  };
  const onDeleteClick = (event) => {
    const {
      target: { idx },
    } = event;
    includedClothes.splice(idx, 1);
    setIncludedClothes(...[includedClothes]);
  };
  const onCreateClick = async () => {
    const storageRef = ref(storage, `${user.uid}/Styles/${uploadUrl.name}`);
    await uploadBytes(storageRef, uploadUrl);
    await getDownloadURL(ref(storage, `${user.uid}/Styles/${uploadUrl.name}`))
      .then(async (url) => {
        const newStyle = {
          docName: uuidv4(),
          id: user.uid,
          selectedListName: selectedListName,
          url: url,
          season: styleSeason,
          clothes: includedClothes,
        };
        const collectionRef = collection(db, "Style");
        await setDoc(doc(collectionRef, newStyle.docName), newStyle);
      })
      .then(
        setStyleSeason([]),
        setIncludedClothes([]),
        setUrl(""),
        setUploadUrl(""),
        onClose()
      );
  };
  return (
    <Box sx={{ display: "flex" }}>
      <Modal open={AddModal} onClose={onClose}>
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              bgcolor: "darkgray",
              justifyContent: "flex-end",
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
          >
            <IconButton sx={{ color: "black" }} onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box sx={{ display: "flex", p: 5, height: 580 }}>
            <AddPicture url={url} setPictureUrl={setPictureUrl} />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                ml: 5,
                width: 428,
              }}
            >
              <StyleDetails onChange={addStyleDetails} />
              <Divider
                sx={{ bgcolor: "black", borderBottomWidth: 2, mb: 2, mt: 2 }}
                flexItem
              />
              <Box
                sx={{ display: "flex", flexDirection: "column", height: 431 }}
              >
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: 18,
                    mb: 1,
                  }}
                >
                  Add Clothes
                </Typography>
                <IncludedClothes
                  includedClothes={includedClothes}
                  onDeleteClick={onDeleteClick}
                  handleOpen={handleOpen}
                />
              </Box>
              <Button
                sx={{
                  bgcolor: "lightgray",
                  color: "black",
                  fontWeight: "bold ",
                }}
                onClick={onCreateClick}
              >
                Create
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
      <AddClothesModal
        openClothesModal={openClothesModal}
        clothesList={clothesList}
        handleClose={handleClose}
        handleComplete={handleComplete}
      />
    </Box>
  );
};

export default AddStyleModal;
