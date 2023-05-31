import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import SubBar from "../../reuse/SubBar";
import EmptyFilteredList from "../DressRoom/EmptyFilteredList";
import AddTagModal from "./AddTagModal";
import StyleEmptyList from "./StyleEmptyList";
import Styles from "./Styles";
import StyleTagEmpty from "./StyleTagEmpty";
import StyleTags from "./StyleTags";
import StyleTagTitle from "./StyleTagTitle";
import { useRecoilState, useRecoilValue } from "recoil";
import { clothesData, styleData, styleTagData } from "../../shared/data";
import { auth, db } from "../../firebase/firebase";
import { collection, onSnapshot, query, where, doc } from "firebase/firestore";
const LookBook = () => {
  const clothesList = useRecoilValue(clothesData);
  const [styleList, setStyleList] = useRecoilState(styleData);
  const [styleTags, setStyleTags] = useRecoilState(styleTagData);
  //
  const [seasonFilter, setSeasonFilter] = useState("");
  const [filteredStyleList, setFilteredStyleList] = useState([]);
  const [tagModal, setTagModal] = useState(false);
  const [styleTag, setStyleTag] = useState("");
  const handleOpen = () => setTagModal(true);
  const handleClose = () => setTagModal(false);
  const resetFilteredStyleList = () => setFilteredStyleList([]);
  const changeStyleTag = (event, value) => {
    setStyleTag(value);
  };
  const changeFitler = (value) => {
    setSeasonFilter(value);
  };
  useEffect(() => {
    const user = auth.currentUser;
    const styleQuery = query(
      collection(db, "styles"),
      where("id", "==", user.uid)
    );
    onSnapshot(styleQuery, (querySnapshot) => {
      const styleData = [];
      querySnapshot.forEach((doc) => {
        styleData.push(doc.data());
      });
      setStyleList(...[styleData]);
    });
    onSnapshot(doc(db, "User", `${user.uid}`), (doc) => {
      if (doc.data().StyleTags) {
        setStyleTags(doc.data().StyleTags);
      }
    });
  }, []);
  return (
    <Grid
      container
      width="100%"
      justifyContent="center"
      p="0 10vw"
      height="100%"
    >
      <Grid container alignContent="flex-start" flexDirection="column">
        <SubBar
          styleList={styleList}
          seasonFilter={seasonFilter}
          changeFitler={changeFitler}
          resetFilteredStyleList={resetFilteredStyleList}
        />

        <Box sx={{ display: "flex", width: "100%", height: "60vh" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              pl: "10px",
              width: "15%",
            }}
          >
            <StyleTagTitle />
            {Object.keys(styleTags).length === 0 ? (
              <StyleTagEmpty styleTag={styleTags} handleOpen={handleOpen} />
            ) : (
              <StyleTags
                styleTags={styleTags}
                styleTag={styleTag}
                changeStyleTag={changeStyleTag}
                handleOpen={handleOpen}
              />
            )}
          </Box>
          <Box sx={{ display: "flex", width: "85%" }}>
            {styleList.length === 0 ? (
              <StyleEmptyList styleList={styleList} />
            ) : seasonFilter !== "" && filteredStyleList.length === 0 ? (
              <EmptyFilteredList />
            ) : (
              <Styles />
            )}
          </Box>
        </Box>
      </Grid>
      {tagModal ? (
        <AddTagModal tagModal={tagModal} handleClose={handleClose} />
      ) : (
        <></>
      )}
    </Grid>
  );
};

export default LookBook;
