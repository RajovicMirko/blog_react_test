import { Grid } from "@mui/material";
import { PropsWithChildren } from "react";

const Actions = ({ children }: PropsWithChildren<any>) => {
  return (
    <Grid
      container
      flexDirection="row-reverse"
      justifyContent="space-between"
      alignItems="center"
    >
      {children}
    </Grid>
  );
};

export default Actions;
