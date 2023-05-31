import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";
const selectboxStyle = {
  ml: 2,
  mr: 0,
  width: "200px",
  "& label.Mui-focused": {
    color: "#191919",
  },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "#191919",
    },
  },
};
const Selector = ({
  category,
  changeFilter,
  filterValue,
}) => {
  const title = Object.keys(category)[0];
  const values = Object.values(category)[0];
  return (
    <FormControl sx={selectboxStyle} size="small">
      <InputLabel>{title}</InputLabel>
      <Select
        name={title}
        value={filterValue}
        label={title}
        onChange={(ev) => {
          changeFilter(ev);
        }}
      >
        <MenuItem value="">none</MenuItem>
        {values.map((itemName, idx) => {
          return (
            <MenuItem key={idx} value={itemName}>
              {itemName}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default Selector;
