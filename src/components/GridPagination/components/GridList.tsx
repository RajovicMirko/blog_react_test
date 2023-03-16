import { Box, Grid, GridProps, styled } from "@mui/material";
import { PropsWithChildren } from "react";
import { GRID_MAX_WIDTH, SCROLLABLE_CLASS } from "../constants";

export const ScrollWrapper = styled(Box)(() => ({
  height: "calc(100% - 56.50px)", // 56.50px is pagination height
  display: "-webkit-flex",
  WebkitFlexDirection: "column",
}));

const ListWrapper = styled(Box)(() => ({
  minHeight: "0px",
  WebkitFlex: "1 1 auto",
  overflowY: "auto",
  display: "flex",
  justifyContent: "center",
}));

const List = styled(Grid)(() => ({
  maxWidth: `${GRID_MAX_WIDTH}px`,
  padding: "30px 60px",
}));

type GridListProps = GridProps & {
  listView: boolean;
};

function GridList({
  children,
  listView,
  ...rest
}: PropsWithChildren<GridListProps>) {
  const spacing = listView ? 1 : 4;

  return (
    <ScrollWrapper>
      <ListWrapper className={SCROLLABLE_CLASS} {...rest}>
        <List container spacing={spacing} pb="30px">
          {children}
        </List>
      </ListWrapper>
    </ScrollWrapper>
  );
}

export default GridList;
