import { Grid, GridProps } from "@mui/material";
import { CardFunction } from "../types";

const gridProps = {
  sm: 6,
  lg: 4,
  xl: 3,
};

const listProps = {};

type GridListItemProps<DataType> = GridProps & {
  data: DataType;
  card: CardFunction<DataType>;
  listView: boolean;
};

function GridListItem<DataType>({
  data,
  card,
  listView,
}: GridListItemProps<DataType>) {
  const gridPropsByView = listView ? listProps : gridProps;

  return (
    <Grid item xs={12} {...gridPropsByView}>
      {card(data, listView)}
    </Grid>
  );
}

export default GridListItem;
