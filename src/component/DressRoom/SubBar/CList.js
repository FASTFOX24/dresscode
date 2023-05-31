import {
  Box,
  Divider,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../../firebase/firebase";
import { ClothesCategories } from "../../../shared/categoryData";
import SearchBar from "./SearchBar";
const buttonStyle = {
  mt: 2,
  // borderTopLeftRadius: 0,
  // borderBottomLeftRadius: 0,
  // "&:not(:last-child)": {
  //   borderTopRightRadius: 0,
  //   borderBottomLeftRadius: 20,
  // },
  "&:hover": { bgcolor: "lightgray", color: "black" },
};
const CList = ({
  season,
  part,
  handleSeason,
  handlePart,
  resetFilteredClothesList,
}) => {
  // const [checkedValueList, setCheckedValueList] = useState({
  //   season: "",
  //   parts: "",
  // });
  const user = auth.currentUser;
  const handleKey = (obj) => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        return obj[key];
      }
    }
  };

  // useEffect(() => {
  //   (async () => {
  //     const x = await getDoc(doc(db, "User", `${user.uid}`));
  //     if (x.data().season && x.data().parts) {
  //       const y = { season: `${x.data().season}`, parts: `${x.data().parts}` };
  //       setCheckedValueList({ ...y });
  //     } else if (x.data().season) {
  //       const y = { season: `${x.data().season}`, parts: "" };
  //       setCheckedValueList({ ...y });
  //     } else {
  //       const y = { season: "", parts: `${x.data().parts}` };
  //       setCheckedValueList({ ...y });
  //     }
  //   })();
  // }, []);

  // useEffect(() => {
  //   if (checkedValueList.season !== "" || checkedValueList.parts !== "") {
  //     clothesFilter(checkedValueList);
  //   }
  // }, [checkedValueList]);
  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <SearchBar placeholder="Search Brand" />
      <FormControl>
        {ClothesCategories.map((e, idx) => {
          return (
            <FormControl key={"CList1-" + idx}>
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontSize: 19,
                  mb: 1,
                }}
              >
                {Object.keys(e)}
              </Typography>
              <Divider sx={{ bgcolor: "black", borderBottomWidth: 2 }} />
              <Box sx={{ display: "flex", flexDirection: "column", mb: 2 }}>
                <ToggleButtonGroup
                  orientation="vertical"
                  value={Object.keys(e)[0] === "season" ? season : part}
                  exclusive
                  onChange={
                    Object.keys(e)[0] === "season" ? handleSeason : handlePart
                  }
                >
                  {handleKey(e).map((c, idx2) => {
                    return (
                      // <FormControlLabel
                      //   key={"CList2-" + idx2}
                      //   value={c}
                      //   control={
                      //     <Radio
                      //       onClick={() => {
                      //         controlCheckList(
                      //           Object.keys(e)[0],
                      //           c
                      //           // checkedValueList
                      //         );
                      //       }}
                      //     />
                      //   }
                      //   label={c}
                      // />
                      <ToggleButton
                        sx={buttonStyle}
                        key={idx2}
                        value={c}
                        onClick={resetFilteredClothesList}
                      >
                        <Typography sx={{ textTransform: "capitalize" }}>
                          {c}
                        </Typography>
                      </ToggleButton>
                    );
                  })}
                </ToggleButtonGroup>
              </Box>
            </FormControl>
          );
        })}
      </FormControl>
    </Box>
  );
};

export default CList;
