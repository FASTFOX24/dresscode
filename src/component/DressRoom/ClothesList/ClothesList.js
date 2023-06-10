import React from "react";
import { Box, Checkbox, Grid, Typography } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import "./clothesInfoModal/ClothesModal.css";
const ClothesList = ({ clothesList, openClothesModal }) => {
  const addFavoriteClothes = async (checked, selectedClothes) => {
    if (checked) {
      await updateDoc(doc(db, "Clothes", `${selectedClothes.docName}`), {
        favorite: true,
      });
    } else {
      await updateDoc(doc(db, "Clothes", `${selectedClothes.docName}`), {
        favorite: false,
      });
    }
  };
  return (
    <Grid container flexWrap="wrap">
      {clothesList.map((e, index) => (
        <Box
          key={index}
          sx={{
            flexDirection: "column",
            padding: "0px 10px",
            mb: "40px",
          }}
        >
          <img
            alt="image_clothes"
            src={e.data.imageUrl_1}
            style={{ width: "300px", height: "300px" }}
            onClick={() => {
              openClothesModal(e.id);
            }}
          />
          <Box
            sx={{
              display: "flex",
              mt: "8px",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              {e.data.season.map((c, idx2) => {
                return (
                  <Typography
                    key={idx2}
                    className={
                      c === "Spring"
                        ? "seasonLabel spring"
                        : c === "Summer"
                        ? "seasonLabel summer"
                        : c === "Fall"
                        ? "seasonLabel fall"
                        : "seasonLabel winter"
                    }
                  >
                    {c}
                  </Typography>
                );
              })}
            </Box>
            <Checkbox
              defaultChecked={e.favorite ? true : false}
              sx={{ width: "14px", height: "14px" }}
              onClick={(ev) => {
                addFavoriteClothes(ev.target.checked, e.data);
              }}
              icon={<FavoriteBorder sx={{ width: "23px" }} />}
              checkedIcon={<Favorite sx={{ color: "#FD4949" }} />}
            />
          </Box>
        </Box>
      ))}
    </Grid>
  );
};

export default ClothesList;
