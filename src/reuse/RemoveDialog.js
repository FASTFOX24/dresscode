import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Slide,
} from "@mui/material";
import React, { forwardRef } from "react";
import { dialogMessage } from "../shared/MSGS";
const buttonStyle = {
  textTransform: "capitalize",
  color: "black",
  "&:hover": { bgcolor: "white", fontWeight: "bold" },
};
const Transition = forwardRef(function Transitios(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const RemoveDialog = ({ dialogOpen, handleClose, doneClick }) => {
  return (
    <Dialog
      sx={{ zIndex: 9999 }}
      open={dialogOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
    >
      <DialogContent>
        <DialogContentText>{dialogMessage.delete}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} sx={buttonStyle}>
          Cancel
        </Button>
        <Button onClick={doneClick} sx={buttonStyle}>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RemoveDialog;
