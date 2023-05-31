import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import React from "react";
import { styleCategoryList } from "../../../../shared/StyleCategory";

const Details = ({ selectedStyle, editMode }) => {
  return (
    <FormGroup sx={{ width: 520, mb: 3 }}>
      <Typography
        sx={{
          fontWeight: "bold",
          borderRadius: 10,
          bgcolor: "lightgray",
          mb: 3,
          textAlign:"center"
        }}
      >
        Season
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-around" }}>
        {styleCategoryList.map((e, idx) => {
          if (editMode) {
            if (selectedStyle.season.includes(e)) {
              return (
                <FormControlLabel
                  key={`edit1-${idx}`}
                  control={<Checkbox defaultChecked />}
                  label={e}
                />
              );
            } else {
              return (
                <FormControlLabel
                  key={`edit2-${idx}`}
                  control={<Checkbox />}
                  label={e}
                />
              );
            }
          } else {
            if (selectedStyle.season.includes(e)) {
              return (
                <FormControlLabel
                  key={`nonEdit1-${idx}`}
                  disabled
                  control={<Checkbox defaultChecked />}
                  label={e}
                />
              );
            } else {
              return (
                <FormControlLabel
                  key={`nonEdit2-${idx}`}
                  disabled
                  control={<Checkbox />}
                  label={e}
                />
              );
            }
          }
        })}
      </Box>
    </FormGroup>
  );
};

export default Details;
