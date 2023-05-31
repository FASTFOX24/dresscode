import { Box, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import "../component/DressRoom/ClothesList/clothesInfoModal/ClothesModal.css";

const SavedInfo = ({ selectedClothes }) => {
  return (
    <Grid container flexDirection="column" mt="30px">
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography sx={{ fontWeight: "bold" }}>Season</Typography>
        <Box sx={{ display: "flex", mt: 1 }}>
          {selectedClothes.season.map((e, idx) => {
            return (
              <Typography
                key={idx}
                className={
                  e === "Spring"
                    ? "seasonLabel spring"
                    : e === "Summer"
                    ? "seasonLabel summer"
                    : e === "Fall"
                    ? "seasonLabel fall"
                    : "seasonLabel winter"
                }
              >
                {e}
              </Typography>
            );
          })}
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", mt: "16px" }}>
        <Typography fontWeight="bold" marginBottom="8px">
          Memo
        </Typography>
        <TextField
          className="memo"
          disabled
          multiline
          rows={4}
          defaultValue={selectedClothes.details}
        />
      </Box>
    </Grid>
  );
};

export default SavedInfo;
