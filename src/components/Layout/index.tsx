import { Paper } from "@mui/material";
import { PropsWithChildren, ReactNode } from "react";
import useAuthContext from "src/context/AuthContext";
import FlexColumn from "../PageWrapper/FlexColumn";
import Header from "./Header";

const Layout = ({ children }: PropsWithChildren<ReactNode>) => {
  const { isAuth } = useAuthContext();

  if (!isAuth) return null;

  return (
    <Paper elevation={0}>
      <FlexColumn>
        <Header />
        {children}
      </FlexColumn>
    </Paper>
  );
};

export default Layout;
