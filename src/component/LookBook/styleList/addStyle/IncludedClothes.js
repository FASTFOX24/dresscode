import { Box, Button, IconButton } from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";

const style = {
  width: 110,
  height: 110,
  borderRadius: 20,
};
const IncludedClothes = ({ includedClothes, onCancelClick, handleOpen }) => {
  const [mode, setMode] = useState(false);
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        overflow: "scroll",
        height: 320,
      }}
    >
      <IconButton
        sx={{
          width: 110,
          height: 110,
          bgcolor: "lightgray",
          m: 1,
          borderRadius: 4,
        }}
        onClick={handleOpen}
      >
        <AddIcon sx={{ width: 40, height: 40, color: "gray" }} />
      </IconButton>
      {includedClothes.map((e, idx) => {
        return (
          <Button
            key={idx}
            sx={{ width: 110, height: 110, borderRadius: 30, m: 2, mb: 4 }}
            onClick={() => {
              onCancelClick(idx);
              setMode(!mode);
              //IncludedClothes를 다시 돌리기 위해서 어쩔 수 없이 setMode를 사용...
            }}
          >
            <img style={style} src={e.url}></img>
          </Button>
        );
      })}
    </Box>
  );
};

export default IncludedClothes;
