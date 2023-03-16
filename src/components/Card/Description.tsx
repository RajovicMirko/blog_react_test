import { Grid, GridProps, Typography, useTheme } from "@mui/material";
import { PropsWithChildren } from "react";

type DescriptionProps = {
  label: string;
  align?: GridProps["alignItems"];
  offsetLabelY?: string;
  inline?: boolean;
};

const Description = ({
  label,
  children,
  align = "center",
  offsetLabelY,
  inline = false,
}: PropsWithChildren<DescriptionProps>) => {
  const theme = useTheme();

  const flexDirection = inline ? "row" : "column";
  const alignItems = inline ? align : "";

  return (
    <Grid container alignItems={alignItems} flexDirection={flexDirection}>
      <Grid item flex={1} mt={offsetLabelY}>
        <Typography variant="body1" color="grey.600">
          {label}:
        </Typography>
      </Grid>
      <Grid item flex={3} sx={theme.mixins.textEllipsis}>
        {children}
      </Grid>
    </Grid>
  );
};

export default Description;
