import {
  Box,
  Button,
  IconButton,
  Modal,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import SearchBar from "../../../../../reuse/SearchBar";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SearchResult from "./SearchResult";
import AddedClothes from "./AddedClothes";
import SearchIcon from "@mui/icons-material/Search";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: "16px",
  overflow: "scroll",
  width:"50vw",
  maxWidth:"700px",
  maxHeight:"80vh",
  display: "block",
  bgcolor: "white",
  paddingLeft: "48px",
  paddingRight: "48px",
  paddingTop: "48px",
  paddingBottom: "54px",
};
const activation = {
  textTransform: "none",
  mt: "40px",
  fontSize: "17px",
  height: "64px",
  borderRadius: "10px",
  color: "black",
  pr: "6px",
  pl: "6px",
  width: "100%",
  bgcolor: "#a6d4f7",
  "&:hover": {
    fontWeight: "bold",
    bgcolor: "#39A9FE",
  },
};
const AddClothesModal = ({
  dressModal,
  clothesList,
  handleClose,
  handleComplete,
  addClothesClick,
  selectedClothes,
}) => {
  const [addedClothes, setAddedClothes] = useState([]);
  const [seasonFilter, setSeasonFilter] = useState("All");
  const [clothesCategory, setClothesCategory] = useState("All");
  const [brand, setBrand] = useState("");
  const [searchToggle, setSearchToggle] = useState(false);
  const [sdf, setSdf] = useState(false);
  const [searchBar, setSearchBar] = useState(true);
  const [filteredClothesList, setFilteredClothesList] = useState([]);
  const onClose = () => {
    setAddedClothes([]);
    handleClose();
  };
  const completeClick = () => {
    handleComplete(addedClothes);
    setAddedClothes([]);
  };
  const changeFilter = (name, value) => {
    if (name === "Season") {
      setSeasonFilter(value);
    } else if (name === "Category") {
      setClothesCategory(value);
    } else if (name === "brand") {
      setBrand(value);
    }
  };
  const searchClick = () => {
    setFilteredClothesList([]);
    setSearchBar(false);
    setSdf(!sdf);
    setSearchToggle(true);
  };
  useEffect(() => {
    if (brand === "") {
      if (seasonFilter === "All" && clothesCategory === "All") {
        clothesList.forEach((element) => {
          filteredClothesList.push(element);
        });
      } else if (seasonFilter !== "All" && clothesCategory === "All") {
        clothesList.forEach((element) => {
          if (element.season.includes(seasonFilter)) {
            filteredClothesList.push(element);
          }
        });
      } else if (seasonFilter === "All" && clothesCategory !== "All") {
        clothesList.forEach((element) => {
          if (element.part.includes(clothesCategory)) {
            filteredClothesList.push(element);
          }
        });
      } else if (seasonFilter !== "All" && clothesCategory !== "All") {
        clothesList.forEach((element) => {
          if (
            element.season.includes(seasonFilter) &&
            element.part.includes(clothesCategory)
          ) {
            filteredClothesList.push(element);
          }
        });
      }
    } else if (brand !== "") {
      clothesList.forEach((element) => {
        if (element.brand === brand) {
          filteredClothesList.push(element);
        }
      });
      if (seasonFilter === "All" && clothesCategory === "All") {
      } else if (seasonFilter !== "All" && clothesCategory === "All") {
        filteredClothesList.forEach((element) => {
          if (!element.season.includes(seasonFilter)) {
            const x = filteredClothesList.indexOf(element);
            filteredClothesList.splice(x, 1);
          }
        });
      } else if (seasonFilter === "All" && clothesCategory !== "All") {
        filteredClothesList.forEach((element) => {
          if (!element.part.includes(clothesCategory)) {
            const x = filteredClothesList.indexOf(element);
            filteredClothesList.splice(x, 1);
          }
        });
      } else if (seasonFilter !== "All" && clothesCategory !== "All") {
        console.log("done");
        filteredClothesList.forEach((element) => {
          if (
            !element.season.includes(seasonFilter) ||
            !element.part.includes(clothesCategory)
          ) {
            const x = filteredClothesList.indexOf(element);
            filteredClothesList.splice(x, 1);
          }
        });
      }
    }
    setFilteredClothesList([...filteredClothesList]);
  }, [sdf]);
  useEffect(() => {
    setAddedClothes([...selectedClothes]);
  }, []);
  const deleteClick = (clickedClothes) => {
    const index = addedClothes.indexOf(clickedClothes);
    addedClothes.splice(index, 1);
    setAddedClothes([...addedClothes]);
  };
  const handleClothes = (selectedClothes) => {
    if (
      filteredClothesList.length === 0 &&
      !addedClothes.includes(selectedClothes)
    ) {
      const index = clothesList.indexOf(selectedClothes);
      addedClothes.push(clothesList[index]);
      setAddedClothes([...addedClothes]);
    } else if (
      filteredClothesList.length !== 0 &&
      !addedClothes.includes(selectedClothes)
    ) {
      const index = filteredClothesList.indexOf(selectedClothes);
      addedClothes.push(filteredClothesList[index]);
      setAddedClothes([...addedClothes]);
    }
  };
  return (
    <Modal open={dressModal} onClose={onClose}>
      <Box sx={style}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            bgcolor: "white",
            pr: "6px",
            pl: "6px",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontSize: "20px" }}>Add Clothes</Typography> 
            <Tooltip
              arrow
              title={
                <h3 style={{ color: "white" }}>
                  Add the clothes used in your styling!
                </h3>
              }
            >
              <HelpOutlineIcon
                sx={{ width: "25px", height: "25px", ml: "4px" }}
              />
            </Tooltip>
          </Box>
          <IconButton onClick={onClose}>
            <CloseIcon sx={{ color: "black" }} />
          </IconButton>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            mt: "28px",
            pr: "6px",
            pl: "6px",
          }}
        >
          <Typography
            sx={{ fontWeight: "bold" }}
            onClick={() => {
              setSearchBar(!searchBar);
            }}
          >
            Search
          </Typography>
          {searchBar ? (
            <>
              <TextField
                name="brand"
                placeholder="Enter brand"
                sx={{ borderRadius: "10px", mt: "12px" }}
                inputProps={{
                  style: {
                    height: "40px",
                    paddingTop: 0,
                    paddingBottom: 0,
                    paddingLeft: "8px",
                    paddingRight: "8px",
                  },
                }}
                onChange={(ev) => {
                  changeFilter(ev.target.name, ev.target.value);
                }}
              />

              <SearchBar
                titleName="dressRoom"
                seasonFilter={seasonFilter}
                clothesCategory={clothesCategory}
                changeFilter={changeFilter}
                completeClick={completeClick}
              />

              <Button
                sx={{
                  textTransform: "none",
                  color: "black",
                  border: "1px black solid",
                  borderRadius: "10px",
                  mt: "12px",
                  height: "44px",
                }}
                onClick={searchClick}
              >
                <SearchIcon />
              </Button>
            </>
          ) : (
            <></>
          )}

          {searchToggle ? (
            <Typography sx={{ fontWeight: "bold", mt: "40px" }}>
              DressRoom
            </Typography>
          ) : (
            <></>
          )}
        </Box>
        {searchToggle ? (
          <Box sx={{ display: "flex", flexDirection: "column", mt: "8px" }}>
            <SearchResult
              list={filteredClothesList}
              handleClothes={handleClothes}
              addedClothes={addedClothes}
            />
          </Box>
        ) : (
          <></>
        )}

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            pr: "6px",
            pl: "6px",
          }}
        >
          <Typography sx={{ fontWeight: "bold", mt: "40px" }}>
            Selected dress
          </Typography>
          <AddedClothes addedClothes={addedClothes} deleteClick={deleteClick} />
        </Box>
        <Button
          sx={activation}
          onClick={() => {
            addClothesClick(addedClothes);
            handleClose();
          }}
        >
          Done
        </Button>
      </Box>
    </Modal>
  );
};

export default AddClothesModal;
