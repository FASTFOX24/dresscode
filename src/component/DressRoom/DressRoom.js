import { Box, Fab } from "@mui/material";
import React, { useEffect, useState } from "react";
import ClothesList from "./ClothesList/ClothesList";
import AddSomethingIcon from "../../reuse/AddSomethingIcon";
import SubBar from "../../reuse/SubBar";
import EmptyList from "../../reuse/EmptyList";
import ClothesModal from "./ClothesList/clothesInfoModal/ClothesModal";
import RemoveDialog from "../../reuse/RemoveDialog";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../../firebase/firebase";
import { deleteObject, getStorage, ref } from "firebase/storage";
import EmptyFilteredList from "./EmptyFilteredList";
import AddDressPopup from "./AddDressPopup";
import { useRecoilState } from "recoil";
import { clothesData } from "../../shared/data";
const fabStyle = {
  position: "sticky",
  top: "85vh",
  marginBottom: "40px",
  textTransform: "none",
  color: "black",
  bgcolor: "#FFAB90",
  width: "100%",
  boxShadow: 3,
  "&:hover": {
    fontWeight: 600,
    bgcolor: "#ff5722",
  },
};
const DressRoom = () => {
  const [clothesList, setClothesList] = useRecoilState(clothesData);
  const [seasonFilter, setSeasonFilter] = useState("");
  const [clothesCategory, setClothesCategory] = useState("");
  const [filteredClothesList, setFilteredClothesList] = useState([]);
  const [idx, setIdx] = useState(null);
  const [openAddPopup, setOpenAddPopup] = useState(false);
  const [clothesModal, setClothesModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleOpen = () => setOpenAddPopup(true);
  const handleClose = () => setOpenAddPopup(false);
  const openClothesModal = (index) => {
    setIdx(index);
    setClothesModal(true);
  };
  const closeClothesModal = () => {
    setIdx(null);
    setClothesModal(false);
  };
  const updateClick = () => {
    setClothesModal(false);
    setUpdateModal(true);
  };
  const updateDone = () => {
    setUpdateModal(false);
    setClothesModal(true);
  };
  const buttonClick = async (event) => {
    const {
      target: { name },
    } = event;
    if (name === "openDialog") {
      setDialogOpen(true);
    } else if (name === "closeDialog") {
      setDialogOpen(false);
    } else if (name === "deleteClick") {
      await deleteObject(ref(getStorage(), clothesList[idx].urlName));
      await deleteObject(ref(getStorage(), clothesList[idx].url2Name));
      await deleteDoc(doc(db, "Clothes", clothesList[idx].docName));
      setDialogOpen(false);
      closeClothesModal();
    } else if (name === "favoriteClothes") {
      console.log("update clothes favorite mark");
    }
  };
  const changeFilter = (event) => {
    const {
      target: { name, value },
    } = event;
    setFilteredClothesList([]);
    if (name === "Season") {
      setSeasonFilter(value);
    } else if (name === "Category") {
      setClothesCategory(value);
    }
  };
  useEffect(() => {
    if (seasonFilter === "" && clothesCategory === "") {
      setFilteredClothesList([]);
    } else if (seasonFilter !== "" && clothesCategory === "") {
      clothesList.forEach((element) => {
        if (element.season.includes(seasonFilter)) {
          filteredClothesList.push(element);
        }
      });
      setFilteredClothesList([...filteredClothesList]);
    } else if (seasonFilter === "" && clothesCategory !== "") {
      clothesList.forEach((element) => {
        if (element.part.includes(clothesCategory)) {
          filteredClothesList.push(element);
        }
      });
      setFilteredClothesList([...filteredClothesList]);
    } else if (seasonFilter !== "" && clothesCategory !== "") {
      clothesList.forEach((element) => {
        if (
          element.season.includes(seasonFilter) &&
          element.part.includes(clothesCategory)
        ) {
          filteredClothesList.push(element);
        }
      });
      setFilteredClothesList([...filteredClothesList]);
    }
  }, [seasonFilter, clothesCategory]);
  useEffect(() => {
    (async () => {
      const user = auth.currentUser;
      const clothesQuery = query(
        collection(db, "clothes"),
        where("id", "==", user.uid)
      );
      onSnapshot(clothesQuery, (queryShanpshot) => {
        const clothesData = [];
        queryShanpshot.forEach((doc) => {
          clothesData.push(doc.data());
        });
        setClothesList(...[clothesData]);
      });
    })();
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: 1,
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <SubBar
        dataLength={clothesList.length}
        seasonValue={seasonFilter}
        partValue={clothesCategory}
        changeFilter={changeFilter}
      />
      <Box
        sx={{
          display: "flex",
          width: "100%",
          maxWidth: "1280px",
          flexDirection: "column",
        }}
      >
        {clothesList.length === 0 ? (
          <EmptyList handleOpen={handleOpen} />
        ) : (seasonFilter !== "" || clothesCategory !== "") &&
          filteredClothesList.length === 0 ? (
          <EmptyFilteredList handleOpen={handleOpen} />
        ) : (
          <>
            <ClothesList
              clothesList={
                filteredClothesList.length === 0
                  ? clothesList
                  : filteredClothesList
              }
              openClothesModal={openClothesModal}
              handleOpen={handleOpen}
            />
            <Fab variant="extended" onClick={handleOpen} sx={fabStyle}>
              Add a new dress
              <AddSomethingIcon />
            </Fab>
          </>
        )}
      </Box>

      {openAddPopup ? (
        <AddDressPopup open={openAddPopup} handleClose={handleClose} />
      ) : (
        <></>
      )}
      {idx !== null ? (
        <ClothesModal
          modalOpen={clothesModal}
          closeModal={closeClothesModal}
          selectedClothes={clothesList[idx]}
          updateClick={updateClick}
          buttonClick={buttonClick}
        />
      ) : (
        <></>
      )}
      {updateModal ? (
        <AddDressPopup
          open={updateModal}
          handleClose={updateDone}
          selectedClothes={clothesList[idx]}
        />
      ) : (
        <></>
      )}
      <RemoveDialog dialogOpen={dialogOpen} buttonClick={buttonClick} />
    </Box>
  );
};

export default DressRoom;
