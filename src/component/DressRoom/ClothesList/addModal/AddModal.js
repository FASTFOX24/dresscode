import { Button, IconButton, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import CategoryCheckBox from "./CategoryCheckBox";
import AddPicture from "./AddPicture";
import MoreInfo from "../../../../reuse/MoreInfo";
import { auth, db } from "../../../../firebase/firebase";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { uuidv4 } from "@firebase/util";
import { collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { ClothesCategories } from "../../../../shared/clothesCategory";
const style = {
  display: "flex",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "550px",
  height: "92vh",
  maxHeight: "890px",
  bgcolor: "white",
  justifyContent: "space-between",
  flexDirection: "column",
  borderRadius: "16px",
};
const buttonStyle = {
  width: "100%",
  height: "70px",
  bgcolor: "#191919",
  color: "white",
  textTransform: "none",
  borderTopRightRadius: 0,
  borderTopLeftRadius: 0,
  borderBottomRightRadius: "16px",
  borderBottomLeftRadius: "16px",
  "&:hover": {
    bgcolor: "#ff5722",
    fontWeight: "bold",
    color: "black",
  },
};
const AddModal = ({ open, handleClose }) => {
  const modalMode = "clothesModal";
  const user = auth.currentUser;
  const [url, setUrl] = useState("");
  const [url2, setUrl2] = useState("");
  const [uploadUrl, setUploadUrl] = useState("");
  const [uploadUrl2, setUploadUrl2] = useState("");
  const [season, setSeason] = useState([]);
  const [part, setPart] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setprice] = useState("");
  const [details, setDetails] = useState("");
  const handleSeason = (event, newSeason) => {
    setSeason(newSeason);
  };
  const handlePart = (event, newPart) => {
    setPart(newPart);
  };
  const handleClothes = (event) => {
    const {
      target: { name, value, files },
    } = event;
    if (name === "image1") {
      setUrl(URL.createObjectURL(files[0]));
      setUploadUrl(files[0]);
    } else if (name === "image2") {
      setUrl2(URL.createObjectURL(files[0]));
      setUploadUrl2(files[0]);
    } else if (name === "brand") {
      setBrand(value);
    } else if (name === "price") {
      const result = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      setprice(result);
    } else if (name === "details") {
      setDetails(value);
    }
  };
  const resetAll = () => {
    setUrl("");
    setUrl2("");
    setUploadUrl("");
    setUploadUrl2("");
    setSeason([]);
    setPart("");
    setDetails("");
    setBrand("");
    setprice("");
  };
  const uploadClothes = async () => {
    if (url && season.length !== 0 && part !== "") {
      const x = ["Spring", "Summer", "Fall", "Winter"];
      const y = [];
      x.map((e, idx) => {
        season.map((c, idx) => {
          if (e === c) {
            return y.push(c);
          }
        });
      });
      resetAll();
      handleClose();
      await uploadBytes(
        ref(getStorage(), `${user.uid}` + `${uploadUrl.name}`),
        uploadUrl
      );
      await uploadBytes(
        ref(getStorage(), `${user.uid}` + `${uploadUrl2.name}`),
        uploadUrl2
      );
      await getDownloadURL(
        ref(getStorage(), `${user.uid}` + `${uploadUrl.name}`)
      ).then(async (url) => {
        const newClothes = {
          docName: uuidv4(),
          favorite: false,
          id: user.uid,
          urlName: `${user.uid}` + `${uploadUrl.name}`,
          season: y,
          part: part,
          brand: brand,
          price: price,
          details: details,
        };
        const collectionRef = collection(db, "Clothes");
        await setDoc(doc(collectionRef, newClothes.docName), newClothes);
        if (uploadUrl2 !== "") {
          await getDownloadURL(
            ref(getStorage(), `${user.uid}` + `${uploadUrl2.name}`)
          ).then(async (url) => {
            await updateDoc(doc(db, "Clothes", newClothes.docName), {
              url2: url,
              url2Name: `${user.uid}` + `${uploadUrl2.name}`,
            });
          });
        }
      });
    } else {
      if (!url) {
      }
      if (season.length === 0) {
      }
      if (part === "") {
      }
    }
  };
  return (
    <Modal
      open={open}
      onClose={() => {
        resetAll();
        handleClose();
      }}
    >
      <Box sx={style}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            p: "24px",
          }}
        >
          <Typography sx={{ fontSize: "24px", fontWeight: "bold" }}>
            New dress
          </Typography>
          <IconButton
            sx={{
              color: "gray",
              "&:hover": { color: "black", bgcolor: "white" },
            }}
            onClick={() => {
              resetAll();
              handleClose();
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Box
          sx={{
            display: "flex",
            padding: "0 24px 24px 24px",
            flexDirection: "column",
            overflow: "scroll",
          }}
        >
          <AddPicture url={url} url2={url2} handleClothes={handleClothes} />
          <CategoryCheckBox
            season={season}
            part={part}
            handleSeason={handleSeason}
            handlePart={handlePart}
            category={ClothesCategories}
          />
          <MoreInfo modalMode={modalMode} handleClothes={handleClothes} />
        </Box>
        <Button onClick={uploadClothes} sx={buttonStyle}>
          Done
        </Button>
      </Box>
    </Modal>
  );
};

export default AddModal;
