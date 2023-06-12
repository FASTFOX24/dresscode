import { Box, Button, IconButton, Modal, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SavedClothesImage from "./SavedClothesImage";
import SavedInfo from "../../../../reuse/SavedInfo";
import { deleteClothes, digitsNumber } from "../../../../apis/wapperFunction";
import RemoveDialog from "../../../../reuse/RemoveDialog";
import { useState } from "react";
import "./ClothesModal.css";
const ClothesModal = ({
  modalOpen,
  closeModal,
  selectedClothes,
  updateClick,
  setBackDrop,
}) => {
  const { brand, part, price } = selectedClothes.data;
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleOpen = () => setDialogOpen(true);
  const handleClose = () => setDialogOpen(false);
  const deleteData = async () => {
    try {
      setDialogOpen(false);
      setBackDrop(true);
      closeModal();
      await deleteClothes(selectedClothes.id, selectedClothes.data);
      setBackDrop(false);
    } catch (error) {
      console.error("Error deleting : ", error);
    }
  };
  return (
    <Modal open={modalOpen} onClose={closeModal}>
      <Box className="modal">
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            {brand !== null ? (
              <Typography sx={{ fontWeight: "bold", fontSize: "30px" }}>
                {brand}
              </Typography>
            ) : (
              <Typography
                variant="h5"
                sx={{ color: "#888888", fontWeight: "bold" }}
              >
                No brand
              </Typography>
            )}
            <Box sx={{ display: "flex" }}>
              <Typography className="fontSize" marginRight="8px">
                {part}
              </Typography>
              <Typography
                className={price !== null ? "fontSize" : "fontSize emptyColor"}
              >
                {price !== null ? digitsNumber(price) + "원" : ""}
              </Typography>
            </Box>
          </Box>
          <IconButton
            sx={{ color: "black", height: "30px", width: "30px" }}
            onClick={closeModal}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <SavedClothesImage selectedClothes={selectedClothes.data} />
        <SavedInfo selectedClothes={selectedClothes.data} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: "20px",
          }}
        >
          <Button onClick={updateClick} className="Btn_update">
            Update
          </Button>
          <Button onClick={handleOpen} className="Btn_delete">
            Delete
          </Button>
        </Box>
        {dialogOpen ? (
          <RemoveDialog
            dialogOpen={dialogOpen}
            handleClose={handleClose}
            doneClick={deleteData}
          />
        ) : (
          <></>
        )}
      </Box>
    </Modal>
  );
};

export default ClothesModal;
