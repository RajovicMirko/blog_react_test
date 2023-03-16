import {
  Modal as MuiModal,
  DialogProps,
  Paper,
  PaperProps,
  Typography,
  styled,
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
  Pick<DialogProps, "open" | "onClose"> & {
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

  const handleClose = (
    // eslint-disable-next-line @typescript-eslint/ban-types
    event: {},
    reason: "backdropClick" | "escapeKeyDown"
  ) => {
    if (!persistent) onClose?.(event, reason);
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
