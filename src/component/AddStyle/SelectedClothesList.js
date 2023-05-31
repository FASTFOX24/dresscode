import { Box, Button, Grid, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React from "react";

const SelectedClothesList = ({ selectedClothes, handleopen }) => {
  return (
    <Grid container flexDirection="column" >
      <Typography sx={{ fontWeight: "bold", mb: "8px" }}>
        Selected dress
      </Typography>
      {selectedClothes.length ? (
        <Box
          sx={{
            display: "flex",
            mb: "8px",
            maxWidth: "100%",
            overflow: "scroll",
          }}
        >
          {selectedClothes.map((e, idx) => {
            return (
              <Box key={idx} sx={{ display: "flex" }}>
                <img
                  key={idx}
                  src={`${e.url}`}
                  style={{
                    height: "100px",
                    width: "100px",
                    marginRight: "8px",
                  }}
                />
              </Box>
            );
          })}
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "1px dashed #C9C9C9",
            borderRadius: "10px",
            height:"100px",
            mb: "8px",
          }}
        >
          <Typography
            sx={{
              fontSize: "13px",
              textAlign: "center",
              color: "gray",
            }}
          >
            Clothes list is empty.
          </Typography>
        </Box>
      )}
      <Button
        sx={{
          border: "1px #666666 solid",
          borderRadius: "10px",
          height: "7vw",
          maxHeight: "48px",
        }}
        onClick={handleopen}
      >
        {selectedClothes.length ? (
          <Typography
            sx={{ textTransform: "none", color: "black", fontSize: "13px" }}
          >
            Edit list
          </Typography>
        ) : (
          <Typography
            sx={{ textTransform: "none", color: "black", fontSize: "13px" }}
          >
            Bring clothes
          </Typography>
        )}
      </Button>
    </Grid>
  );
};

export default SelectedClothesList;
