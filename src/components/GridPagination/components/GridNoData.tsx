import { Grid, GridProps, styled, Typography } from "@mui/material";

const GridNoDataWrapper = styled(Grid)(() => ({
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

type GridNoDataProps = GridProps & {
  text: string;
};

const GridNoData = ({ text, ...rest }: GridNoDataProps) => {
  return (
    <GridNoDataWrapper {...rest}>
      <Typography variant="h5" color="grey.500">
        {text}
      </Typography>
    </GridNoDataWrapper>
  );
};

export default GridNoData;
