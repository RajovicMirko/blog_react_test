import GridOnIcon from "@mui/icons-material/GridOn";
import TableRowsIcon from "@mui/icons-material/TableRows";
import { Box, Button, Grid, styled, Typography } from "@mui/material";
import { PaginationHookReturn } from "src/server/base/hooks/usePagination/types";
import PaperStyled from "../../PaperStyled";
import { GRID_MAX_WIDTH } from "../constants";

const HalfSide = styled(Grid)(() => ({}));
HalfSide.defaultProps = {
  item: true,
  display: "flex",
  alignItems: "center",
};

const ViewButton = styled(Button)(({ theme }) => ({
  width: "34px",
  minWidth: "34px",
  height: "34px",
  color: theme.palette.action.disabled,
  "&:disabled": {
    color: theme.palette.primary.main,
  },
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
      <Grid container maxWidth={`${GRID_MAX_WIDTH}px`}>
        <Grid container item p="10px 20px" xs={12}>
          <HalfSide xs={1}>
            {useSwitch && (
              <>
                <Grid item>
                  <ViewButton
                    aria-label="Grid"
                    disabled={!listView}
                    onClick={onLayoutViewClick}
                  >
                    <GridOnIcon />
                  </ViewButton>
                </Grid>
                <Grid item>
                  <ViewButton
                    aria-label="List"
                    disabled={listView}
                    onClick={onLayoutViewClick}
                  >
                    <TableRowsIcon />
                  </ViewButton>
                </Grid>
              </>
            )}
          </HalfSide>

          <HalfSide xs={11} justifyContent="flex-end">
            <Grid item>
              <Typography variant="body2">{paginationText}</Typography>
            </Grid>
            <Grid item>
              <Box>
                <Button
                  onClick={handleBack}
                  disabled={isFirstPage}
                  color="secondary"
                  aria-label="Back"
                >
                  Back
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={isLastPage}
                  color="secondary"
                  aria-label="Next"
                >
                  Next
                </Button>
              </Box>
            </Grid>
          </HalfSide>
        </Grid>
      </Grid>
    </PaperStyled>
  );
};

export default GridPaginationControl;
