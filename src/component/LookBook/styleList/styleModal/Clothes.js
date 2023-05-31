import { Box, Button, IconButton } from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Cancel";
import AddClothesModal from "../addStyle/addClothes/AddClothesModal";
import EditButton from "./EditButton";
import ClothesModal from "../../../DressRoom/ClothesList/clothesInfoModal/ClothesModal";
const style = {
  width: 157,
  height: 157,
  borderRadius: 10,
};
const editStyle = {
  width: 157,
  height: 157,
  borderRadius: 10,
  opacity: 0.5,
};
const Clothes = ({ selectedStyle, editMode, clothesList, onChangeMode }) => {
  const [mode, setMode] = useState(false);
  const [openClothesModal, setOpenClothesModal] = useState(false);
  const [clothesModal, setClothesModal] = useState(false);
  const [idx, setIdx] = useState(null);
  const [includedClothes, setIncludedClothes] = useState([
    ...selectedStyle.clothes,
  ]);
  const handleOpen = () => {
    setOpenClothesModal(true);
  };
  const handleClose = () => {
    setOpenClothesModal(false);
  };
  const onCancelClick = (idx) => {
    includedClothes.splice(idx, 1);
    setMode(!mode);
  };
  const handlClothesModal = (idx) => {
    setIdx(idx);
    setClothesModal(true);
  };
  const closeClothesModal = () => {
    setClothesModal(false);
  };
  const styleClothes = () => {
    return includedClothes.map((e, idx) => {
      return editMode ? (
        <Box
          key={`clothesEdit-${idx}`}
          sx={{ display: "flex", height: 157, width: 157, m: 1 }}
        >
          <img style={editMode ? editStyle : style} src={e.url} />
          <IconButton
            sx={{
              positon: "absolute",
              transform: "translate(-120%, 20%)",
              width: 30,
              height: 30,
            }}
            onClick={onCancelClick}
          >
            <CancelIcon
              sx={{
                width: 30,
                height: 30,
                color: "black",
              }}
            />
          </IconButton>
        </Box>
      ) : (
        <Button
          key={`clothes-${idx}`}
          sx={{ width: 173, height: 173, borderRadius: 2 }}
          onClick={() => handlClothesModal(idx)}
        >
          <img style={editMode ? editStyle : style} src={e.url} />
        </Button>
      );
    });
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          display: "flex",
          bgcolor: "lightgray",
          height: 350,
          mb: 3,
          borderRadius: 2,
          flexWrap: "wrap",
          overflow: "scroll",
        }}
      >
        {editMode ? (
          <IconButton
            sx={{ width: 157, height: 157, borderRadius: 2, m: 1 }}
            onClick={handleOpen}
          >
            <AddIcon sx={{ width: 40, height: 40, color: "black" }} />
          </IconButton>
        ) : (
          <></>
        )}
        {styleClothes()}
        <AddClothesModal
          openClothesModal={openClothesModal}
          handleClose={handleClose}
          clothesList={clothesList}
        />
      </Box>
      <EditButton
        editMode={editMode}
        onChangeMode={onChangeMode}
        selectedStyle={selectedStyle}
      />
      <ClothesModal
        clothesModal={clothesModal}
        closeClothesModal={closeClothesModal}
        selectedClothes={selectedStyle.clothes[idx]}
      />
    </Box>
  );
};

export default Clothes;
