import { LinearProgress, LinearProgressProps, styled } from "@mui/material";

enum CustomPropNameKeys {
  isLoading = "isLoading",
}

const styledOptions = {
  name: "MyLinearProgress",
  shouldForwardProp: (prop: string) =>
    !Object.keys(CustomPropNameKeys).includes(prop),
};

type LinearProgressCustomProps = {
  isLoading?: boolean;
};

type LinearProgressStyledProps = LinearProgressProps &
  LinearProgressCustomProps;

const LinearProgressStyled = styled(
  LinearProgress,
  styledOptions
)<LinearProgressStyledProps>(({ theme, isLoading }) => {
  return {
    position: "absolute",
    width: "100%",
    visibility: isLoading ? "visible" : "hidden",
    zIndex: theme.zIndex.appBar,
  };
});

export const LinearLoading = (props: LinearProgressStyledProps) => {
  return <LinearProgressStyled color="success" {...props} />;
};
