import { Backdrop } from "@mui/material";
import Circular from "../Circular";

export const PageLoading = () => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
    >
      <Circular color="primary" size={60} />
    </Backdrop>
  );
};
