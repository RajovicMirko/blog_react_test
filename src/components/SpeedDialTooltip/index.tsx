import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import SpeedDial, { SpeedDialProps } from "@mui/material/SpeedDial";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { styled } from "@mui/material";
import useToggle from "../../hooks/useToggle";

//#region Types
enum CustomPropNameKeys {
  actions = "actions",
  onClick = "onClick",
  tooltipWidth = "tooltipWidth",
}

const styledOptions = {
  name: "MyCustomSpeedDial",
  shouldForwardProp: (prop: string) =>
    !Object.keys(CustomPropNameKeys).includes(prop),
};

type Action<IdType> = {
  id: IdType;
  icon: JSX.Element;
  tooltip?: string;
};

type CustomProps<IdType> = {
  actions?: Action<IdType>[];
  onClick?: (id: IdType) => void;
  tooltipWidth?: number;
};

type SpeedDialTooltipProps<IdType = void> = Omit<SpeedDialProps, "onClick"> &
  CustomProps<IdType>;

//#endregion

//#region Styled components
const SpeedDialStyled = styled(
  SpeedDial,
  styledOptions
)<SpeedDialTooltipProps>(({ theme, tooltipWidth }) => ({
  ...theme.mixins.floatButtonPosition,
  "& .MuiSpeedDialAction-staticTooltipLabel": {
    width: `${tooltipWidth}px`,
  },
}));

const BackdropStyled = styled(Backdrop)(() => ({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
}));
//#endregion

export default function SpeedDialTooltip<IdType>({
  actions,
  onClick,
  ...rest
}: SpeedDialTooltipProps<IdType>) {
  const [isOpen, toggleOpen] = useToggle();

  const onActionClick = (id: IdType) => () => {
    onClick?.(id);
    setTimeout(() => toggleOpen(), 5);
  };

  return (
    <Box>
      <BackdropStyled open={isOpen} onClick={toggleOpen} />
      <SpeedDialStyled
        icon={<MoreVertIcon />}
        open={isOpen}
        FabProps={{
          onClick: toggleOpen,
        }}
        {...rest}
      >
        {actions?.map((action) => (
          <SpeedDialAction
            key={action.id as string}
            id={action.id as string}
            icon={action.icon}
            onClick={onActionClick(action.id)}
            tooltipTitle={action.tooltip}
            tooltipOpen={!!action.tooltip}
          />
        ))}
      </SpeedDialStyled>
    </Box>
  );
}
