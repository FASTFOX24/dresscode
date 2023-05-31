import React from "react";
import {
  Box,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import "./MoreInfo.css";

const MoreInfo = ({ modalMode, clothesData, setClothesData }) => {
  const handleBrand = (event) => {
    setClothesData({ ...clothesData, brand: event.target.value });
  };
  const handlePrice = (event) => {
    setClothesData({ ...clothesData, price: event.target.value });
  };
  const handleDetails = (event) => {
    setClothesData({ ...clothesData, details: event.target.value });
  };
  return (
    <Grid container flexDirection="column" width="500px">
      <Typography sx={{ fontWeight: "bold", mb: "12px" }}>
        Dress information
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <TextField
          className="textField_short outlineColor"
          label="Brand"
          defaultValue={clothesData.brand}
          onChange={handleBrand}
        />
        <FormControl
          className="textField_short outlineColor"
          variant="outlined"
        >
          <InputLabel htmlFor="display-name">Pirce</InputLabel>
          <OutlinedInput
            label="Price"
            defaultValue={clothesData.price}
            onChange={handlePrice}
            endAdornment={<InputAdornment position="end">원</InputAdornment>}
          />
        </FormControl>
      </Box>
      <TextField
        className="textField_long outlineColor"
        multiline
        rows={4}
        label="Memo"
        defaultValue={clothesData.details}
        onChange={handleDetails}
      />
    </Grid>
  );
};

export default MoreInfo;
