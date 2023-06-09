import { Paper } from "@mui/material";
import { PropsWithChildren, ReactNode } from "react";
import Header from "./Header";

const Layout = ({ children }: PropsWithChildren<ReactNode>) => {
  return (
    <Paper elevation={0}>
      <Header />
      {children}
    </Paper>
  );
};

export default Layout;
