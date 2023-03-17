import { styled, Theme, useTheme } from "@mui/material";
import { createContext, PropsWithChildren, useContext } from "react";
import { ToastContainer } from "react-toastify";
import generateCssVariables from "./generateCssVariables";

import "react-toastify/dist/ReactToastify.min.css";
import generateCssStyle from "./generateCssStyle";

type ToastStyledProps = { muiTheme: Theme };

const styledOptions = {
  shouldForwardProp: (prop: string) => !["muiTheme"].includes(prop),
};

const ToastStyled = styled(
  ToastContainer,
  styledOptions
)<ToastStyledProps>(({ muiTheme }) => ({
  ...generateCssVariables(muiTheme),
  ...generateCssStyle(muiTheme),
}));

const NotificationContext = createContext({});

export const NotificationProvider = ({ children }: PropsWithChildren<any>) => {
  const muiTheme = useTheme();
  const theme = muiTheme.palette.mode as any;

  return (
    <NotificationContext.Provider value={{}}>
      <ToastStyled
        position="top-right"
        autoClose={2000}
        hideProgressBar
        closeButton={false}
        draggable={false}
        theme={theme}
        muiTheme={muiTheme}
      />
      {children}
    </NotificationContext.Provider>
  );
};

const useNotification = () => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error("useNotification must be used under NotificationContext");
  }

  return context;
};
export default useNotification;
