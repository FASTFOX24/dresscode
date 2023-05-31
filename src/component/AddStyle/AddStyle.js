import {
  Autocomplete,
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import CategoryCheckBox from "../DressRoom/ClothesList/addModal/CategoryCheckBox";
import { clothesCategories } from "../../shared/categoryData";
import AddClothesModal from "../LookBook/styleList/addStyle/addClothes/AddClothesModal";
import StyleImage from "./StyleImage";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { auth, db } from "../../firebase/firebase";
import { uuidv4 } from "@firebase/util";
import { doc, setDoc } from "firebase/firestore";
import SelectedClothesList from "./SelectedClothesList";
const deactivation = {
  textTransform: "none",
  mt: "40px",
  fontSize: "17px",
  height: "64px",
  borderRadius: "10px",
  color: "white",
  pr: "6px",
  pl: "6px",
  width: "100%",
  bgcolor: "#CCCCCC",
};
const activation = {
  textTransform: "none",
  mt: "40px",
  fontSize: "17px",
  fontWeight: 600,
  boxShadow: 3,
  height: "64px",
  borderRadius: "10px",
  pr: "6px",
  pl: "6px",
  width: "100%",
  bgcolor: "#a6d4f7",
  color: "black",
  "&:hover": {
    fontWeight: "bold",
    bgcolor: "#39A9FE",
  },
};
const AddStyle = ({ clothesList, userStyleTags }) => {
  const season = [clothesCategories[0]]; // 스타일 시즌을 위한 사계절
  const [styleImage, setStyleImage] = useState({
    mainImage: "",
    subImage: ["subImage", "subImage", "subImage"],
  }); // 스타일 이미지 업로드시 페이지에 출력을 위한 url
  console.log(styleImage)
  const [uploadStyleImage, setUploadStyleImage] = useState({
    mainImage: "",
    subImage: ["subImage", "subImage", "subImage"],
  }); //이미지를 storage에 업로드하기 위한 url
  const storageUrl = {
    mainImage: "",
    subImage: ["subImage", "subImage", "subImage"],
  }; //이미지의 스토리지 url
  const styleTag = Object.keys(userStyleTags).sort();
  const [dressModal, setDressModal] = useState(false);
  const [styleSeason, setStyleSeason] = useState([]); // 선택된 시즌
  const [selectedTag, setSelectedTag] = useState([]);
  const [selectedClothes, setSelectedClothes] = useState([]);
  const [memo, setMemo] = useState("");
  const addClothesClick = (list) => {
    setSelectedClothes([...list]);
  };
  const handleSeason = (event, newSeason) => {
    setStyleSeason(newSeason);
  };
  //드레스 추가 모달 on/off
  const handleopen = () => setDressModal(true);
  const handleClose = () => setDressModal(false);
  //
  const doneEditDress = () => {
    handleClose();
  };
  const changeStlyeTag = (event, value) => {
    value.forEach((tag) => {
      selectedTag.push({ [tag]: userStyleTags.tag });
    });
  };
  const handleStyleImage = (event) => {
    const {
      target: { name, files },
    } = event;
    if (name === "mainImage") {
      styleImage.mainImage = URL.createObjectURL(files[0]);
      uploadStyleImage.push(files[0]);
      setUploadStyleImage([...uploadStyleImage]);
    }
    // styleImage.push(URL.createObjectURL(files[0]));
    // setStyleImage([...styleImage]);
    // uploadStyleImage.push(files[0]);
    // setUploadStyleImage([...uploadStyleImage]);
  };
  const doneClick = () => {
    const user = auth.currentUser;
    uploadStyleImage.forEach(async (uploadUrl, idx) => {
      if (uploadUrl !== "") {
        await uploadBytes(
          ref(getStorage(), `${user.uid}/Style/${uuidv4()}`),
          uploadUrl
        ).then(async (snapshot) => {
          await getDownloadURL(
            ref(getStorage(), `${user.uid}/Style/${snapshot.metadata.name}`)
          ).then((url) => {
            storageUrl[idx] = url;
          });
        });
      }
      if (idx === 4) {
        const newStyle = {
          docName: uuidv4(),
          docId: user.uid,
          images: storageUrl,
          season: styleSeason,
          tags: selectedTag,
          selctedClothes: selectedClothes,
          favorite: false,
        };
        await setDoc(doc(db, "Styles", newStyle.docName), newStyle);
      }
    });
  };
  return (
    <Grid
      container
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "60vw",
          maxWidth: "900px",
          minWidth: "400px",
          margin: "40px 0",
        }}
      >
        <Typography sx={{ fontSize: "32px" }}>New Style</Typography>
        <Box
          sx={{ display: "flex", mt: "32px", justifyContent: "space-between" }}
        >
          <StyleImage
            styleImage={styleImage}
            handleStyleImage={handleStyleImage}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              width: "50%",
              maxHeight: "600px",
              ml: "32px",
            }}
          >
            <Divider sx={{ mb: "4px" }} />
            <CategoryCheckBox
              category={season}
              season={styleSeason}
              handleSeason={handleSeason}
            />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography sx={{ mb: "8px", fontWeight: "bold" }}>
                Style tag
              </Typography>
              <Autocomplete
                multiple
                options={styleTag}
                getOptionLabel={(options) => options}
                filterSelectedOptions
                onChange={changeStlyeTag}
                renderInput={(params) => <TextField {...params} />}
              />
            </Box>
            <SelectedClothesList
              selectedClothes={selectedClothes}
              handleopen={handleopen}
            />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography sx={{ fontWeight: "bold", mb: "8px" }}>
                Memo
              </Typography>
              <TextField
                multiline
                rows={4}
                placeholder="Add more details."
                onChange={(ev) => {
                  setMemo(ev.target.value);
                }}
              />
            </Box>
          </Box>
        </Box>
        <Button
          disabled={
            !styleImage.mainImage || styleSeason.length === 0 ? true : false
          }
          sx={
            !styleImage.mainImage || styleSeason.length === 0
              ? deactivation
              : activation
          }
          onClick={doneClick}
        >
          Done
        </Button>
      </Box>
      <AddClothesModal
        dressModal={dressModal}
        clothesList={clothesList}
        handleClose={handleClose}
        handleComplete={doneEditDress}
        addClothesClick={addClothesClick}
        selectedClothes={selectedClothes}
      />
    </Grid>
  );
};

export default AddStyle;
