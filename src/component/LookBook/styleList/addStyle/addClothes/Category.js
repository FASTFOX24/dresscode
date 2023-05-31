import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import React from "react";
import { ClothesCategories } from "../../../../../shared/clothesCategory";

const Category = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: 250 }}>
      {ClothesCategories.map((e, idx) => {
        const categoryName = Object.keys(e);
        return (
          <Box key={idx} sx={{ display: "flex", flexDirection: "column",mb:2 }}>
            <Typography sx={{ fontWeight: "bold",bgcolor:"lightgray",borderRadius:10, textAlign:"center",mb:1 }}>{categoryName}</Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              {e[categoryName].map((e2, idx2) => {
                return (
                  <FormControlLabel
                    sx={{ width: 120 }}
                    key={idx2}
                    control={<Checkbox />}
                    label={e2}
                  />
                );
              })}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default Category;
