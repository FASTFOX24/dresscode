import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  InputAdornment,
  OutlinedInput,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { ClothesCategories } from "../../../../../shared/clothesCategory";
import CategoryCheckBox from "../../addModal/CategoryCheckBox";
const SavedClothesDetails = ({
  season,
  part,
  handleSeason,
  handlePart,
  updating,
  selectedClothes,
  buttonControl,
  updateClothes,
}) => {
  const [brnadList, setBrandList] = useState(["Covernot", "Vans"]);
  const handleKey = (e) => {
    for (var key in e) {
      if (e.hasOwnProperty(key)) {
        return e[key];
      }
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        ml: 4.7,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {ClothesCategories.map((e, idx) => {
          return (
            <Box
              key={`clothesCheckbox${idx}`}
              sx={{
                display: "flex",
                flexDirection: "column",
                width: 428,
                mb: 1,
              }}
            >
              <Typography
                sx={{
                  bgcolor: "lightgray",
                  borderRadius: 2,
                  textAlign: "center",
                  mb: 2,
                  fontWeight: "bold",
                }}
              >
                {Object.keys(e)}
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                <ToggleButtonGroup
                  sx={{ flexWrap: "wrap" }}
                  value={Object.keys(e)[0] === "season" ? season : part}
                  onChange={
                    Object.keys(e)[0] === "season" ? handleSeason : handlePart
                  }
                >
                  {handleKey(e).map((c, idx2) => {
                    return (
                      <CategoryCheckBox
                        key={idx2}
                        updating={updating}
                        value={c}
                      />
                    );
                  })}
                </ToggleButtonGroup>
              </Box>
            </Box>
          );
        })}
      </Box>
      {updating ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: 318,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Autocomplete
              sx={{ width: 200, mb: 2 }}
              freeSolo
              defaultValue={selectedClothes.brand}
              options={brnadList.map((option) => option)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  onChange={(ev) => {
                    updateClothes("Brand", ev.target.value);
                  }}
                />
              )}
            />
            <FormControl sx={{ width: 200, mb: 2 }} variant="outlined">
              <OutlinedInput
                placeholder="Price"
                defaultValue={selectedClothes.price}
                onChange={(ev) => {
                  updateClothes("Price", ev.target.value);
                }}
                endAdornment={
                  <InputAdornment position="end">원</InputAdornment>
                }
              />
            </FormControl>
            <TextField
              id="Details"
              multiline
              rows={4}
              defaultValue={selectedClothes.details}
              placeholder="Add more details."
              onChange={(ev) => {
                updateClothes("Details", ev.target.value);
              }}
            />
          </Box>
          <Box sx={{ display: "flex" }}>
            <Button
              sx={{
                width: 428,
                color: "black",
                fontWeight: "bold",
                bgcolor: "lightgray",
                textTransform: "capitalize",
                "&:hover": {
                  bgcolor: "darkgray",
                },
              }}
            >
              Complete
            </Button>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: 318,
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Autocomplete
              sx={{ width: 200, mb: 2 }}
              disabled
              freeSolo
              defaultValue={selectedClothes.brand}
              options={brnadList.map((option) => option)}
              renderInput={(params) => <TextField {...params} />}
            />
            <FormControl sx={{ width: 200, mb: 2 }} variant="outlined">
              <OutlinedInput
                disabled
                defaultValue={selectedClothes.price}
                endAdornment={
                  <InputAdornment position="end">원</InputAdornment>
                }
              />
            </FormControl>
            <TextField
              multiline
              rows={4}
              disabled
              defaultValue={selectedClothes.details}
            />
          </Box>
          <Button
            sx={{
              width: "100%",
              color: "black",
              fontWeight: "bold",
              bgcolor: "lightgray",
              textTransform: "capitalize",
              "&:hover": {
                bgcolor: "darkgray",
              },
            }}
            onClick={()=>{buttonControl("update")}}
          >
            Update
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default SavedClothesDetails;
