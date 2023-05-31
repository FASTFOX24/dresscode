import { Box, Button, Typography } from "@mui/material";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import React from "react";
import { db } from "../../../../firebase/firebase";
const buttonStyle1 = {
  bgcolor: "lightGray",
  width: 250,
};
const buttonStyle2 = {
  bgcolor: "lightGray",
};
const textStyle = {
  color: "black",
};
const EditButton = ({ editMode, onChangeMode, selectedStyle }) => {
  const q = query( 
    collection(db, "Style"),
    where("docName", "==", `${selectedStyle.docName}`)
  );
  const unsubscribe = onSnapshot(q, (querySnapshot) => {});
  const addClothes = () => {
    unsubscribe();
    onChangeMode();
  };
  const handleClose = () => {
    // resetIncludedClothes();
    //includedClothes를 selectedStyle의 clothes로 초기화
    onChangeMode();
  };
  return editMode ? (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Button sx={buttonStyle1} onClick={addClothes}>
        <Typography sx={textStyle}>Done</Typography>
      </Button>
      <Button sx={buttonStyle1} onClick={handleClose}>
        <Typography sx={textStyle}>Close</Typography>
      </Button>
    </Box>
  ) : (
    <Button sx={buttonStyle2} onClick={onChangeMode}>
      <Typography sx={textStyle}>Edit</Typography>
    </Button>
  );
};

export default EditButton;
