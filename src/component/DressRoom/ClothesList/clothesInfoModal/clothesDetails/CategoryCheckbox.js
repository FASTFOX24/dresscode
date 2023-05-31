import {
  Checkbox,
  FormControlLabel,
  ToggleButton,
  Typography,
} from "@mui/material";
const CategoryCheckbox = ({
  idx,
  updating,
  value,
  selectedClothes,
  updateClothes,
}) => {
  if (updating) {
    return (
      <ToggleButton
        sx={{ width: 102, ml: 0.5, mr: 0.5, mb: 1, border: 0 }}
        value={value}
      >
        <Typography sx={{ textTransform: "capitalize" }}>{value}</Typography>
      </ToggleButton>
    );

    // if (
    //   selectedClothes.season.includes(value) ||
    //   selectedClothes.part.includes(value)
    // ) {
    //   return (
    //     <FormControlLabel
    //       sx={{ width: 102 }}
    //       control={
    //         <Checkbox
    //           defaultChecked
    //           onChange={() => {
    //             updateClothes("CheckBox", idx, value);
    //           }}
    //         />
    //       }
    //       label={value}
    //     />
    //   );
    // } else {
    //   return (
    //     <FormControlLabel
    //       sx={{ width: 102 }}
    //       control={
    //         <Checkbox
    //           onChange={() => {
    //             updateClothes("CheckBox", idx, value);
    //           }}
    //         />
    //       }
    //       label={value}
    //     />
    //   );
    // }
  } else {
    return (
      <ToggleButton
        sx={{ width: 102, ml: 0.5, mr: 0.5, mb: 1, border: 0 }}
        disabled
        value={value}
      >
        <Typography sx={{ textTransform: "capitalize" }}>{value}</Typography>
      </ToggleButton>
    );

    // if (
    //   selectedClothes.season.includes(value) ||
    //   selectedClothes.part.includes(value)
    // ) {
    //   return (
    //     <FormControlLabel
    //       sx={{ width: 102 }}
    //       disabled
    //       control={<Checkbox defaultChecked />}
    //       label={value}
    //     />
    //   );
    // } else {
    //   return (
    //     <FormControlLabel
    //       sx={{ width: 102 }}
    //       disabled
    //       control={<Checkbox />}
    //       label={value}
    //     />
    //   );
    // }
  }
};

export default CategoryCheckbox;
