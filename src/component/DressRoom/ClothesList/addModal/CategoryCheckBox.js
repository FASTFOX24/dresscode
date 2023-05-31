import {
  Box,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { clothesCategories } from "../../../../shared/categoryData";
import "./CategoryCheckBox.css";
const CategoryCheckBox = ({ clothesData, setClothesData }) => {
  const classMap = {
    Spring: "spring",
    Summer: "summer",
    Fall: "fall",
    Winter: "winter",
  };
  const handleKey = (e) => {
    for (let key in e) {
      if (e.hasOwnProperty(key)) {
        return e[key];
      }
    }
  };
  const handleSeason = (event, value) => {
    setClothesData({ ...clothesData, season: value });
  };
  const handlePart = (event, value) => {
    setClothesData({ ...clothesData, part: value });
  };
  return (
    <Grid container flexDirection="column" width={"500px"}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {clothesCategories.map((e, idx) => {
          return (
            <Box
              key={idx}
              sx={{
                display: "flex",
                flexDirection: "column",
                mb: "16px",
              }}
            >
              <Typography sx={{ fontWeight: "bold" }}>
                {Object.keys(e)}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                }}
              >
                <ToggleButtonGroup
                  exclusive={Object.keys(e)[0] === "Season" ? false : true}
                  value={
                    Object.keys(e)[0] === "Season"
                      ? clothesData.season
                      : clothesData.part
                  }
                  onChange={
                    Object.keys(e)[0] === "Season" ? handleSeason : handlePart
                  }
                  sx={{ display: "flex", width: "100%", flexWrap: "wrap" }}
                >
                  {handleKey(e).map((c, idx2) => {
                    return (
                      <ToggleButton
                        value={c}
                        key={idx2}
                        className={`seasonBtn ${classMap[c] || "categoryBtn"}`}
                      >
                        <Typography
                          sx={{
                            textTransform: "none",
                            fontSize: "14px",
                            m: "2px",
                          }}
                        >
                          {c}
                        </Typography>
                      </ToggleButton>
                    );
                  })}
                </ToggleButtonGroup>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Grid>
  );
};

export default CategoryCheckBox;
