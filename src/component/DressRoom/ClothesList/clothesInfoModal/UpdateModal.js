import { Box, Button, IconButton, Modal, Typography } from "@mui/material";
import React, { useState } from "react";
import { auth, db } from "../../../../firebase/firebase";
import CloseIcon from "@mui/icons-material/Close";
import AddPicture from "../addModal/AddPicture";
import CategoryCheckBox from "../addModal/CategoryCheckBox";
import MoreInfo from "../../../../reuse/MoreInfo";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { clothesCategories } from "../../../../shared/categoryData";
const style = {
  display: "flex",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "400px",
  height: "700px",
  bgcolor: "white",
  flexDirection: "column",
  borderRadius: "16px",
  p: 3,
};
const UpdateModal = ({ open, close, selectedClothes, doneClick }) => {
  const modalMode = "clothesModal";
  const user = auth.currentUser;
  const [url, setUrl] = useState(selectedClothes.url);
  const [url2, setUrl2] = useState(selectedClothes.url2);
  const [uploadUrl, setUploadUrl] = useState("");
  const [uploadUrl2, setUploadUrl2] = useState("");
  const [season, setSeason] = useState(selectedClothes.season);
  const [part, setPart] = useState(selectedClothes.part);
  const [brand, setBrand] = useState(selectedClothes.brand);
  const [price, setprice] = useState(selectedClothes.price);
  const [details, setDetails] = useState(selectedClothes.details);
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
      setprice(value);
    } else if (name === "details") {
      setDetails(value);
    }
  };
  const updateClothes = async () => {
    const x = ["Spring", "Summer", "Fall", "Winter"];
    const y = [];
    x.map((e, idx) => {
      season.map((c, idx) => {
        if (e === c) {
          return y.push(c);
        }
      });
    });
    if (uploadUrl === "" && uploadUrl2 === "") {
      await updateDoc(doc(db, "Clothes", selectedClothes.docName), {
        season: y,
        part: part,
        brand: brand,
        price: price,
        details: details,
      });
    } else if (uploadUrl !== "" && uploadUrl2 === "") {
      await deleteObject(ref(getStorage(), selectedClothes.urlName));
      await uploadBytes(
        ref(getStorage(), `${user.uid}` + `${uploadUrl.name}`),
        uploadUrl
      );
      await getDownloadURL(
        ref(getStorage(), `${user.uid}` + `${uploadUrl.name}`)
      ).then(async (url) => {
        await updateDoc(doc(db, "Clothes", selectedClothes.docName), {
          url: url,
          urlName: `${user.uid}` + `${uploadUrl.name}`,
          season: y,
          part: part,
          brand: brand,
          price: price,
          details: details,
        });
      });
    } else if (uploadUrl === "" && uploadUrl2 !== "") {
      await deleteObject(ref(getStorage(), selectedClothes.url2Name));
      await uploadBytes(
        ref(getStorage(), `${user.uid}` + `${uploadUrl2.name}`),
        uploadUrl2
      );
      await getDownloadURL(
        ref(getStorage(), `${user.uid}` + `${uploadUrl2.name}`)
      ).then(async (url) => {
        await updateDoc(doc(db, "Clothes", selectedClothes.docName), {
          url2: url,
          url2Name: `${user.uid}` + `${uploadUrl2.name}`,
          season: season,
          part: part,
          brand: brand,
          price: price,
          details: details,
        });
      });
    } else if (uploadUrl !== "" && uploadUrl2 !== "") {
      console.log("run");
      await deleteObject(ref(getStorage(), selectedClothes.urlName));
      await deleteObject(ref(getStorage(), selectedClothes.url2Name));
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
        await updateDoc(doc(db, "Clothes", selectedClothes.docName), {
          url: url,
          urlName: `${user.uid}` + `${uploadUrl.name}`,
          season: y,
          part: part,
          brand: brand,
          price: price,
          details: details,
        }).then(
          getDownloadURL(
            ref(getStorage(), `${user.uid}` + `${uploadUrl2.name}`).then(
              async (url) => {
                await updateDoc(doc(db, "Clothes", selectedClothes.docName), {
                  url2: url,
                  url2Name: `${user.uid}` + `${uploadUrl2.name}`,
                });
              }
            )
          )
        );
      });
    }
    doneClick();
  };
  return (
    <Modal open={open} onClose={close}>
      <Box sx={style}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 1,
          }}
        >
          <Typography sx={{ fontSize: "22px", fontWeight: "bold" }}>
            Update
          </Typography>
          <IconButton sx={{ color: "black" }} onClick={close}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <AddPicture url={url} url2={url2} handleClothes={handleClothes} />
          <CategoryCheckBox
            season={season}
            part={part}
            handleSeason={handleSeason}
            handlePart={handlePart}
            category={clothesCategories}
          />
          <MoreInfo
            modalMode={modalMode}
            brand={brand}
            price={price}
            details={details}
            handleClothes={handleClothes}
          />
          <Box sx={{ display: "flex", mt: "13px" }}>
            <Button
              onClick={updateClothes}
              sx={{
                width: "100%",
                height: "50px",
                bgcolor: "#EDEDED",
                color: "black",
                textTransform: "none",
                "&:hover": { bgcolor: "#BEBEBE", fontWeight: "bold" },
              }}
            >
              Done
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default UpdateModal;
