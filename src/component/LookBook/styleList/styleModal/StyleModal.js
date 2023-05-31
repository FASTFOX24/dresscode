import { Box, IconButton, Modal, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState } from "react";
import Details from "./Details";
import EditButton from "./EditButton";
import Picture from "./Picture";
import Clothes from "./Clothes";
const style = {
  display: "flex",
  flexDirection: "column",
  width: 1000,
  height: 700,
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
};
const StyleModal = ({ styleModal, onClose, selectedStyle, clothesList }) => {
  const [editMode, setEditMode] = useState(false);
  const onChangeMode = () => {
    setEditMode(!editMode);
  };
  return (
    <Modal open={styleModal} onClose={onClose}>
      <Box style={style}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            bgcolor: "gray",
            alignItems: "center",
          }}
        >
          <Typography sx={{ color: "white", fontWeight: "bold" }}>
            Style
          </Typography>
          <IconButton sx={{ color: "white" }} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box sx={{ display: "flex", height: "100%", p: 5, bgcolor: "white" }}>
          <Box sx={{ display: "flex", width: 400 }}>
            <Picture selectedStyle={selectedStyle} editMode={editMode} />
          </Box>
          <Box
            sx={{
              display: "flex",
              width: 520,
              flexDirection: "column",
              justifyContent: "space-between",
              ml: 5,
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Details selectedStyle={selectedStyle} editMode={editMode} />
              <Typography
                sx={{
                  fontWeight: "bold",
                  bgcolor: "lightgray",
                  borderRadius: 10,
                  mb: 3,
                  textAlign: "center",
                }}
              >
                Clothes
              </Typography>
              <Clothes
                selectedStyle={selectedStyle}
                editMode={editMode}
                clothesList={clothesList}
                onChangeMode={onChangeMode}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default StyleModal;
