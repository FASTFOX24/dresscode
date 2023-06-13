import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { FavoriteBorder } from "@mui/icons-material";
import { IconButton } from "@mui/material";

const FavoriteButton = ({ checkState = false, clickBtn }) => {
  return (
    <IconButton onClick={clickBtn}>
      {checkState ? <FavoriteIcon sx={{ color: "red" }} /> : <FavoriteBorder />}
    </IconButton>
  );
};

export default FavoriteButton;
