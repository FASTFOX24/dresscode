import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import AddSomethingIcon from "../../reuse/AddSomethingIcon";

const StyleEmptyList = ({ styleList, handleOpen }) => {
  return (
    <Grid container pr="10px">
      {styleList.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            border: "1px dashed #C9C9C9",
            borderRadius: "16px",
            width: "100%",
            mt: "30px",
            ml: "32px",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography
            sx={{
              textAlign: "center",
              fontSize: "14px",
              fontWeight: "bold",
              color: "gray",
            }}
          >
            The style room is empty.
            <br /> Create your own style room!
          </Typography>
          <Button
            sx={{
              p: 1,
              pl: 2,
              mt: 4,
              borderRadius: "99px",
              textTransform: "none",
              color: "black",
              bgcolor: "#a6d4f7",
              boxShadow: 3,
              "&:hover": {
                fontWeight: 600,
                bgcolor: "#39A9FE",
              },
            }}
            // to="/addingStyle"
            href="/addingStyle"
          >
            Add my Style
            <AddSomethingIcon />
          </Button>
        </Box>
      ) : (
        <></>
      )}
    </Grid>
  );
};

export default StyleEmptyList;
