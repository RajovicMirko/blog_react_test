import { Box, Grid, GridProps, styled } from "@mui/material";
import { PropsWithChildren } from "react";
import {
  GRID_MAX_WIDTH,
  PAGINATION_HEIGHT,
  SCROLLABLE_CLASS,
} from "../constants";

export const ScrollWrapper = styled(Box)(() => ({
  height: `calc(100% - ${PAGINATION_HEIGHT}px)`,
  display: "flex",
  WebkitFlexDirection: "column",
}));

const PositionWrapper = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
}));

const ListWrapper = styled(Box)(() => ({
  overflowY: "auto",
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
        <PositionWrapper>
          <List container spacing={spacing} pb="30px">
            {children}
          </List>
        </PositionWrapper>
      </ListWrapper>
    </ScrollWrapper>
  );
}

export default GridList;
