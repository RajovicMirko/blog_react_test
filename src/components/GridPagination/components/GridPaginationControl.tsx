import { Box, Button, Grid, styled, Typography } from "@mui/material";
import PaperStyled from "../../PaperStyled";
import GridOnIcon from "@mui/icons-material/GridOn";
import ViewHeadlineIcon from "@mui/icons-material/ViewHeadline";
import { GRID_MAX_WIDTH } from "../constants";
import { PaginationHookReturn } from "src/server/base/hooks/usePagination/types";

const HalfSide = styled(Grid)(() => ({}));
HalfSide.defaultProps = {
  container: true,
  item: true,
  xs: 6,
  alignItems: "center",
};

const ViewButton = styled(Button)(() => ({
  width: "34px",
  minWidth: "34px",
  height: "34px",
}));
ViewButton.defaultProps = {
  variant: "text",
};

type GridPaginationControlProps = {
  useSwitch: boolean;
  pagination: PaginationHookReturn;
  listView: boolean;
  onLayoutViewClick: () => void;
};

const GridPaginationControl = ({
  useSwitch,
  pagination,
  listView,
  onLayoutViewClick,
}: GridPaginationControlProps) => {
  const {
    getPaginationDisplayData,
    handleBack,
    handleNext,
    isFirstPage,
    isLastPage,
  } = pagination;

  const { from, to, total } = getPaginationDisplayData();

  const paginationText = `Displaying: ${from}-${to}/${total}`;

  return (
    <PaperStyled
      elevation={0}
      sx={{ display: "flex", justifyContent: "center" }}
    >
      <Grid
        container
        item
        p="10px 20px"
        xs={12}
        maxWidth={`${GRID_MAX_WIDTH}px`}
      >
        <HalfSide item xs={3}>
          {useSwitch && (
            <>
              <Grid item>
                <ViewButton disabled={!listView} onClick={onLayoutViewClick}>
                  <GridOnIcon />
                </ViewButton>
              </Grid>
              <Grid item>
                <ViewButton disabled={listView} onClick={onLayoutViewClick}>
                  <ViewHeadlineIcon fontSize="medium" />
                </ViewButton>
              </Grid>
            </>
          )}
        </HalfSide>

        <HalfSide item spacing={3} xs={9} justifyContent="flex-end">
          <Grid item>
            <Typography variant="body2">{paginationText}</Typography>
          </Grid>
          <Grid item>
            <Box>
              <Button
                onClick={handleBack}
                disabled={isFirstPage}
                color="secondary"
              >
                Back
              </Button>
              <Button
                onClick={handleNext}
                disabled={isLastPage}
                color="secondary"
              >
                Next
              </Button>
            </Box>
          </Grid>
        </HalfSide>
      </Grid>
    </PaperStyled>
  );
};

export default GridPaginationControl;
