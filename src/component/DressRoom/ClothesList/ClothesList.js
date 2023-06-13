import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import "./clothesInfoModal/ClothesModal.css";
import FavoriteButton from "../../../reuse/FavoriteButton";
import { useRecoilValue } from "recoil";
import { userData } from "../../../shared/data";
import { bookMark } from "../../../apis/wapperFunction";

const ClothesList = ({ clothesList, openClothesModal }) => {
  const userInfo = useRecoilValue(userData);
  return (
    <Grid container flexWrap="wrap">
      {clothesList.map((e, index) => (
        <Box
          key={`clothes${index}`}
          sx={{
            flexDirection: "column",
            padding: "0px 10px",
            mb: "40px",
          }}
        >
          <img
            alt="image_clothes"
            src={e.data.imageUrl_1}
            style={{ width: "300px", height: "300px", borderRadius: "8px" }}
            onClick={() => {
              openClothesModal(e.id);
            }}
          />
          <Box
            sx={{
              display: "flex",
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
            <FavoriteButton
              checkState={userInfo.clothesBookMark?.includes(e.id)}
              clickBtn={() => {
                bookMark(e.id, userInfo.clothesBookMark, "clothesBookMark");
              }}
            />
          </Box>
        </Box>
      ))}
    </Grid>
  );
};

export default ClothesList;
