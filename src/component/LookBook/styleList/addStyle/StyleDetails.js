import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import React from "react";
import { styleCategoryList } from "../../../../shared/StyleCategory";

const StyleDetails = ({ onChange }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography sx={{ fontWeight: "bold", fontSize: 19, mb: 1 }}>
        Season
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        {styleCategoryList.map((e, idx) => {
          return (
            <FormControlLabel
              key={idx}
              control={<Checkbox onChange={() => onChange(e)} />}
              label={e}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default StyleDetails;
