import { Card as MCard, CardProps, Grid, styled } from "@mui/material";
import Circular from "../Loading/Circular";
import Actions from "./Actions";
import Description from "./Description";
import Title from "./Title";

enum CustomPropNameKeys {
  isLoading = "isLoading",
}

const styledOptions = {
  name: "MyCustomCard",
  shouldForwardProp: (prop: string) =>
    !Object.keys(CustomPropNameKeys).includes(prop),
};

type CustomProps = {
  isLoading?: boolean;
};

type CardStyledProps = CardProps & CustomProps;

const CardStyled = styled(
  MCard,
  styledOptions
)<CardStyledProps>(() => ({
  display: "flex",
  flexFlow: "column",
  rowGap: "20px",
  padding: "20px 20px 14px 20px",
  justifyContent: "space-between",
}));

const Card = ({ isLoading, children, ...rest }: CardStyledProps) => {
  return (
    <CardStyled {...rest}>
      {isLoading ? (
        <Grid container justifyContent="center" alignItems="center" flex={1}>
          <Circular />
        </Grid>
      ) : (
        children
      )}
    </CardStyled>
  );
};

Card.Actions = Actions;

Card.Title = Title;
Card.Description = Description;

export default Card;
