import { Box, Button, IconButton, Modal, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SavedClothesImage from "./SavedClothesImage";
import SavedInfo from "../../../../reuse/SavedInfo";
import { digitsNumber } from "../../../../apis/wapperFunction";
import "./ClothesModal.css";
const ClothesModal = ({
  modalOpen,
  closeModal,
  selectedClothes,
  updateClick,
  buttonClick,
}) => {
  const { brand, part, price } = selectedClothes;
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
        <SavedClothesImage selectedClothes={selectedClothes} />
        <SavedInfo selectedClothes={selectedClothes} />
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
          <Button
            name="openDialog"
            onClick={buttonClick}
            className="Btn_delete"
          >
            Delete
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ClothesModal;
