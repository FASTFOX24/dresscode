import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import AddSomethingIcon from "./AddSomethingIcon";

const EmptyList = ({ handleOpen }) => {
  return (
    <Grid
      container
      margin="0px 10px"
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
          The dress room is empty. Create your own dress room!
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
            bgcolor: "#FFAB90",
            boxShadow: 3,
            "&:hover": {
              bgcolor: "#ff5722",
              fontWeight: 600,
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

export default EmptyList;
