import { Button } from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Box } from "@mui/system";
import AddStyleModal from "./addStyle/AddStyleModal";
import StyleModal from "./styleModal/StyleModal";
import Styles from "../Styles";
import AddSomethingIcon from "../../../reuse/AddSomethingIcon";
const imgStyle = {
  maxWidth: 280,
  maxHeight: 265,
  borderRadius: 2,
};
const buttonStyle = {};
const boxStyle = {
  width: 300,
  height: 320,
  borderRadius: 1,
  ml: 2,
  mb: 2,
  mr: 2,
  border: "2px solid black",
  flexDirection: "cloumn",
  bgcolor: "lightgray",
  "&:hover": {
    bgcolor: "gray",
  },
};
const StyleList = ({ clothesList, styleList, selectedListName }) => {
  const [openStyleAddModal, setOpenStyleAddModal] = useState(false);
  const [styleModal, setStyleModal] = useState(false);
  const [idx, setIdx] = useState(0);
  const handleOpen = () => setOpenStyleAddModal(true);
  const handleClose = () => setOpenStyleAddModal(false);
  const openStyleModal = (id) => {
    setIdx(id);
    setStyleModal(true);
  };
  const closeStyleModal = () => {
    setStyleModal(false);
  };
  return (
    <Box sx={{ display: "flex", ml: 11, flexWrap: "wrap" }}>
      <Button sx={boxStyle} onClick={handleOpen}>
        <AddSomethingIcon />
      </Button>
      <Styles styleList={styleList} onOpen={openStyleModal} />
      <AddStyleModal
        open={openStyleAddModal}
        onClose={handleClose}
        clothesList={clothesList}
        selectedListName={selectedListName}
      />
      <StyleModal
        styleModal={styleModal}
        onClose={closeStyleModal}
        selectedStyle={styleList[idx]}
        clothesList={clothesList}
      />
    </Box>
  );
};

export default StyleList;
