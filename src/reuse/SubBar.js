import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import Selector from "./Selector";
import { clothesCategories } from "../shared/categoryData";
const SubBar = ({
  dataLength,
  seasonValue,
  partValue,
  changeFilter,
}) => {
  const titleName =
    useLocation().pathname === "/dressroom" ? "DressRoom" : "StyleList";
  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      maxWidth={"1280px"}
      height={140}
      padding="0 10px"
    >
      <Typography sx={{ fontWeight: "bold", fontSize: 25 }}>
        {titleName + " " + `(${dataLength})`}
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {clothesCategories.map((category, idx) => {
          return (
            <Selector
              key={Object.keys(category)[0] + idx}
              category={category}
              filterValue={idx ? partValue : seasonValue}
              changeFilter={changeFilter}
            />
          );
        })}
      </Box>
    </Grid>
  );
};

export default SubBar;
