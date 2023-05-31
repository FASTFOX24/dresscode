import {
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { styleCategoryList } from "../../../shared/StyleCategory";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import TypingField from "./TypingField";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase/firebase";
import { collection, query, onSnapshot } from "firebase/firestore";
import SearchBar from "../../DressRoom/SubBar/SearchBar";
const toggleButtonStyle = {
  justifyContent: "space-between",
  "&.Mui-selected, &.Mui-selected:hover": {
    backgroundColor: "darkgray",
  },
  "&:hover": {
    bgcolor: "lightgray",
  },
};
const StyleCategory = ({ handleSelectedListName, selectedListName }) => {
  const [open, setOpen] = useState(false);
  const [listName, setListName] = useState("");
  const [styleList, setStyleList] = useState([]);
  const user = auth.currentUser
  const q = query(collection(db, "styleCategory"));
  const onOffClick = () => {
    setOpen(!open);
  };
  const changeListName = (event) => {
    const {
      target: { value },
    } = event;
    setListName(value);
  };
  const addList = async() => {
    await updateDoc(doc(db,"User",user.uid),{

    })
    // setDoc(doc(db, "styleCategory", `${listName}`), { docName: listName });
    setListName("");
    onOffClick();
  };
  useEffect(() => {
    onSnapshot(q, (querySnapshot) => {
      const x = [];
      querySnapshot.forEach((doc) => {
        x.push(doc.data());
      });
      setStyleList(...[x]);
    });
  }, []);
  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: 250 }}>
      <SearchBar />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography sx={{ fontWeight: "bold", fontSize: 19, mb: 1 }}>
          Season
        </Typography>
        <Divider sx={{ bgcolor: "black", borderBottomWidth: 2 }} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {styleCategoryList.map((e, idx) => {
            return (
              <FormControlLabel
                sx={{
                  width: 120,
                  "&:hover": {
                    borderRadius: 2,
                    fontSize: 40,
                  },
                }}
                key={idx}
                control={<Checkbox />}
                label={e}
              />
            );
          })}
        </Box>
        <Divider sx={{ bgcolor: "black", borderBottomWidth: 2 }} />
      </Box>
      <Box
        sx={{ display: "flex", width: "100%", flexDirection: "column", mt: 1 }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            ml: 1,
          }}
        >
          <Typography sx={{ fontWeight: "bold" }}>StyleList</Typography>
          <IconButton sx={{ color: "black" }} onClick={onOffClick}>
            {open ? <RemoveIcon /> : <AddIcon />}
          </IconButton>
        </Box>
        <TypingField
          open={open}
          changeListName={changeListName}
          addList={addList}
        />
        <Box
          sx={{
            display: "flex",
            border: "2px solid black",
            borderRadius: 1,
            mt: 1,
            flexDirection: "column",
            minHeight: 250,
            maxHeight: 300,
            overflow: "scroll",
          }}
        >
          <ToggleButtonGroup
            value={selectedListName}
            exclusive
            onChange={handleSelectedListName}
            sx={{ flexDirection: "column" }}
          >
            {styleList.map((e, idx) => {
              return (
                <ToggleButton
                  key={`styleCategory-${idx}`}
                  value={e.docName}
                  sx={toggleButtonStyle}
                >
                  <CheckroomIcon />
                  <Typography sx={{ color: "black" }}>{e.docName}</Typography>
                  <Box />
                </ToggleButton>
              );
            })}
          </ToggleButtonGroup>
        </Box>
      </Box>
    </Box>
  );
};

export default StyleCategory;
