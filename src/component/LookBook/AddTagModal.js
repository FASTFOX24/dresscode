import {
  Autocomplete,
  Box,
  Button,
  Modal,
  TextField,
  Tooltip,
  tooltipClasses,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import React, { useEffect, useState } from "react";
import { styleTag } from "../../shared/AdminStyelTag";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../../firebase/firebase";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { ConstructionOutlined } from "@mui/icons-material";

const style = {
  display: "flex",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  flexDirection: "column",
  borderRadius: "10px",
};
const deactivation = {
  textTransform: "none",
  fontSize: "17px",
  borderRadius: "10px",
  color: "white",
  width: "100%",
  bgcolor: "#CCCCCC",
  mt: "16px",
};
const activation = {
  fontSize: "17px",
  borderRadius: "10px",
  mt: "16px",
  textTransform: "none",
  color: "black",
  bgcolor: "#a6d4f7",
  boxShadow: 3,
  "&:hover": {
    fontWeight: 600,
    bgcolor: "#39A9FE",
  },
};
const AddTagModal = ({ tagModal, handleClose }) => {
  const [adminTag, setAdminTag] = useState("");
  const [userTag, setUserTag] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const user = auth.currentUser;

  const CustomWidthTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} placement="right" />
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: 240,
    },
  });
  const handleTag = (event) => {
    const {
      target: { value, innerText },
      type,
    } = event;
    if (type === "click") {
      setAdminTag(innerText);
    } else if (type === "change") {
      setUserTag(value);
    }
  };
  const doneClick = async () => {
    await updateDoc(doc(db, "User", `${user.uid}`), {
      [`StyleTags.${userTag}`]: adminTag,
    });
    handleClose()
  };
  return (
    <Modal open={tagModal} onClose={handleClose}>
      <Box sx={style}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography sx={{ fontSize: "25px" }}>New tag</Typography>
          <CustomWidthTooltip
            arrow
            title={
              <h3 style={{ color: "white" }}>
                Manage your style room more uniquely with your own tags!!
              </h3>
            }
          >
            <HelpOutlineIcon
              sx={{ width: "22px", height: "22px", ml: "2px" }}
            />
          </CustomWidthTooltip>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", mt: "32px" }}>
          <Autocomplete
            disablePortal
            options={styleTag}
            onChange={handleTag}
            renderInput={(params) => {
              return (
                <TextField
                  name="adminTag"
                  {...params}
                  placeholder="Select a default tag."
                />
              );
            }}
          />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", mt: "16px" }}>
          <TextField placeholder="Create your own tag." onChange={handleTag} />
          {errorMessage !== "" ? (
            <Box sx={{ display: "flex", mt: "4px", alignItems: "center" }}>
              <ErrorOutlineIcon
                sx={{ width: "14px", height: "14px", color: "red", mr: "2px" }}
              />
              <Typography sx={{ fontSize: "13px", color: "red" }}>
                {errorMessage}
              </Typography>
            </Box>
          ) : (
            <></>
          )}
        </Box>

        <Button
          // disabled={adminTag === "" ? true : false}
          sx={adminTag === "" ? deactivation : activation}
          onClick={doneClick}
        >
          Done
        </Button>
      </Box>
    </Modal>
  );
};

export default AddTagModal;
