import { Box, Fab } from "@mui/material";
import React, { useEffect, useState } from "react";
import ClothesList from "./ClothesList/ClothesList";
import AddSomethingIcon from "../../reuse/AddSomethingIcon";
import SubBar from "../../reuse/SubBar";
import EmptyList from "../../reuse/EmptyList";
import ClothesModal from "./ClothesList/clothesInfoModal/ClothesModal";
import { collection, doc, onSnapshot, query } from "firebase/firestore";
import { auth, db } from "../../firebase/firebase";
import EmptyFilteredList from "./EmptyFilteredList";
import AddDressPopup from "./AddDressPopup";
import { useRecoilState } from "recoil";
import { clothesData } from "../../shared/data";
import { updateClothes, uploadClothes } from "../../apis/wapperFunction";
import LoadingBackDrop from "../../reuse/LoadingBackDrop";
import { backDropMessages } from "../../shared/MSGS";
const fabStyle = {
  position: "sticky",
  top: "85vh",
  marginBottom: "40px",
  textTransform: "none",
  color: "black",
  bgcolor: "#ff5722",
  width: "200px",
  boxShadow: 3,
  fontWeight: 600,
  "&:hover": {
    bgcolor: "#ff5722",
  },
};
const DressRoom = () => {
  const [clothesList, setClothesList] = useRecoilState(clothesData);
  const [seasonFilter, setSeasonFilter] = useState("");
  const [clothesCategory, setClothesCategory] = useState("");
  const [filteredClothesList, setFilteredClothesList] = useState([]);
  const [docId, setDocId] = useState(null);
  const [openAddPopup, setOpenAddPopup] = useState(false);
  const [clothesModal, setClothesModal] = useState(false);
  const [backDrop, setBackDrop] = useState(false);
  const [openUpdatePopup, setOpenUpdatePopup] = useState(false);
  const handleOpen = () => setOpenAddPopup(true);
  const handleClose = () => setOpenAddPopup(false);
  const openClothesModal = (docId) => {
    setDocId(docId);
    setClothesModal(true);
  };
  const closeClothesModal = () => {
    setDocId(null);
    setClothesModal(false);
  };
  const updateClick = () => {
    setClothesModal(false);
    setOpenUpdatePopup(true);
  };
  const updateDone = () => {
    setOpenUpdatePopup(false);
    setClothesModal(true);
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
        if (element.data.season.includes(seasonFilter)) {
          filteredClothesList.push(element);
        }
      });
      setFilteredClothesList([...filteredClothesList]);
    } else if (seasonFilter === "" && clothesCategory !== "") {
      clothesList.forEach((element) => {
        if (element.data.part.includes(clothesCategory)) {
          filteredClothesList.push(element);
        }
      });
      setFilteredClothesList([...filteredClothesList]);
    } else if (seasonFilter !== "" && clothesCategory !== "") {
      clothesList.forEach((element) => {
        if (
          element.data.season.includes(seasonFilter) &&
          element.data.part.includes(clothesCategory)
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
        collection(doc(db, "User", user.uid), "clothes")
      );
      onSnapshot(clothesQuery, (queryShanpshot) => {
        const clothesData = [];
        queryShanpshot.forEach((doc) => {
          clothesData.push({ id: doc.id, data: doc.data() });
        });
        setClothesList(...[clothesData]);
      });
    })();
  }, [setClothesList]);
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
          justifyContent: "center",
          alignItems: "center",
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
        <AddDressPopup
          open={openAddPopup}
          handleClose={handleClose}
          handleClothesData={uploadClothes}
        />
      ) : (
        <></>
      )}
      {docId !== null ? (
        <ClothesModal
          modalOpen={clothesModal}
          closeModal={closeClothesModal}
          selectedClothes={
            clothesList.filter((clothes) => clothes.id === docId)[0]
          }
          updateClick={updateClick}
          setBackDrop={setBackDrop}
        />
      ) : (
        <></>
      )}
      {openUpdatePopup ? (
        <AddDressPopup
          open={openUpdatePopup}
          handleClose={updateDone}
          selectedClothes={
            clothesList.filter((clothes) => clothes.id === docId)[0]
          }
          handleClothesData={updateClothes}
        />
      ) : (
        <></>
      )}
      <LoadingBackDrop
        backdrop={backDrop}
        loadingMessage={backDropMessages.delete}
      />
    </Box>
  );
};

export default DressRoom;
