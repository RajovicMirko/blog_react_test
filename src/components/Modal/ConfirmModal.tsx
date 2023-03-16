import { Grid, Typography } from "@mui/material";
import Modal, { ModalProps } from ".";
import ButtonLoading from "../Button/ButtonLoading";

type ConfirmModalProps = ModalProps & {
  description: string;
  onOk: () => void;
  onClose: () => void;
  isLoading?: boolean;
  okText?: string;
  cancelText?: string;
};

const ConfirmModal = ({
  title,
  open,
  onClose,
  description,
  onOk,
  okText = "Yes",
  cancelText = "Cancel",
  isLoading,
}: ConfirmModalProps) => {
  const handleCancel = () => {
    onClose?.();
  };

  return (
    <Modal
      title={title}
      open={open}
      onClose={onClose}
      sx={{ minWidth: "300px" }}
    >
      <Typography variant="body1">{description}</Typography>

      <Typography variant="body1">Please confirm!</Typography>

      <Grid
        container
        pt="40px"
        justifyContent="space-between"
        flexDirection={{
          xs: "column-reverse",
          md: "row",
        }}
        gap={{
          xs: "30px",
        }}
      >
        <Grid item>
          <ButtonLoading
            fullWidth
            color="info"
            label={cancelText}
            onClick={handleCancel}
          />
        </Grid>

        <Grid item>
          <ButtonLoading
            fullWidth
            color="error"
            variant="contained"
            label={okText}
            onClick={onOk}
            isLoading={isLoading}
          />
        </Grid>
      </Grid>
    </Modal>
  );
};

export default ConfirmModal;
