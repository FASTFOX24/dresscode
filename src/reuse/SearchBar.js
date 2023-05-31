import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React from "react";
import { clothesCategories } from "../shared/categoryData";

const SearchBar = ({ seasonFilter, clothesCategory, changeFilter }) => {
  const handleKey = (obj) => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        return obj[key];
      }
    }
  };
  return (
    <Grid container justifyContent="space-between" mt="12px">
      {clothesCategories.map((e, idx) => {
        return (
          <FormControl key={idx} sx={{ width: "49%" }} size="small">
            <InputLabel sx={{ textAlign: "center" }}>
              {Object.keys(e)[0]}
            </InputLabel>
            <Select
              name={Object.keys(e)[0]}
              value={idx === 0 ? seasonFilter : clothesCategory}
              label={idx === 0 ? "Season" : "Category"}
              onChange={(ev) => {
                changeFilter(ev.target.name, ev.target.value);
              }}
            >
              <MenuItem value="All">All</MenuItem>
              {handleKey(e).map((c, idx2) => {
                return (
                  <MenuItem key={idx2} value={c}>
                    {c}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        );
      })}
    </Grid>
  );
};

export default SearchBar;
