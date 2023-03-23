import {
  DialogProps,
  Modal as MuiModal,
  Paper,
  PaperProps,
  styled,
  Typography,
} from "@mui/material";
import { MouseEventHandler } from "react";

const ModalStyled = styled(MuiModal)(() => ({
  display: "flex",
  flexFlow: "column",
  justifyContent: "center",
  alignItems: "center",
}));

const PaperStyled = styled(Paper)(() => ({
  padding: "30px 50px",
  minWidth: "500px",
}));

export type ModalProps = PaperProps &
  Pick<DialogProps, "open"> & {
    onClose: () => void;
    title?: string;
    persistent?: boolean;
  };

const Modal = ({
  title,
  children,
  open,
  onClose,
  persistent = false,
  ...restPaper
}: ModalProps) => {
  const handleClick: MouseEventHandler<HTMLDivElement> = (event) => {
    event.stopPropagation();
  };

  const handleClose = () => {
    if (!persistent) onClose?.();
  };

  return (
    <ModalStyled open={open} onClose={handleClose}>
      <PaperStyled onClick={handleClick} {...restPaper}>
        {title && (
          <Typography variant="h5" mb="30px">
            {title}
          </Typography>
        )}
        {children}
      </PaperStyled>
    </ModalStyled>
  );
};

export default Modal;
