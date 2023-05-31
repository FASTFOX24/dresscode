import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material";
import React, { forwardRef } from "react";
const buttonStyle = {
  textTransform: "capitalize",
  color: "black",
  "&:hover": { bgcolor:"white",fontWeight: "bold" },
};
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const RemoveDialog = ({ dialogOpen, buttonClick }) => {
  return (
    <Dialog
      sx={{ zIndex: 9999 }}
      name="closeDialog"
      open={dialogOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={buttonClick}
    >
      <DialogTitle>{"Remove the Clothes?"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Once deleted, it can't be restored. Are you sure you want to delete
          this clothes?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button name="closeDialog" sx={buttonStyle} onClick={buttonClick}>
          Cancel
        </Button>
        <Button name="deleteClick" sx={buttonStyle} onClick={buttonClick}>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RemoveDialog;
