import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import AddSomethingIcon from "../../reuse/AddSomethingIcon";

const EmptyFilteredList = ({ handleOpen }) => {
  return (
    <Grid
      container
      border="1px #C9C9C9 dashed"
      borderRadius="16px"
      height="65vh"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Typography
          sx={{
            width: 200,
            textAlign: "center",
            fontSize: "14px",
            fontWeight: "bold",
            color: "gray",
          }}
        >
          There is no item. <br /> Try adding a new item!!
        </Typography>
        <Button
          onClick={handleOpen}
          sx={{
            borderRadius: "99px",
            p: 2,
            pl: 3,
            mt: 4,
            textTransform: "none",
            color: "black",
            bgcolor: "#a6d4f7",
            boxShadow: 3,
            "&:hover": {
              fontWeight: 600,
              bgcolor: "#39A9FE",
            },
          }}
        >
          Add a new dress
          <AddSomethingIcon />
        </Button>
      </Box>
    </Grid>
  );
};

export default EmptyFilteredList;
