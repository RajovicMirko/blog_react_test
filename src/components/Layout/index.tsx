import { Paper } from "@mui/material";
import { PropsWithChildren, ReactNode } from "react";
import useAuthContext from "src/context/AuthContext";
import Header from "./Header";

const Layout = ({ children }: PropsWithChildren<ReactNode>) => {
  const { isAuthenticated } = useAuthContext();

  if (!isAuthenticated) return null;

  return (
    <Paper elevation={0}>
      <Header />
      {children}
    </Paper>
  );
};

export default Layout;
