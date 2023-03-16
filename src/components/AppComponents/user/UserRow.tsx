import { useNavigate } from "react-router-dom";
import { Avatar, Grid, Typography, useTheme } from "@mui/material";
import Person2Icon from "@mui/icons-material/Person2";
import { User } from "../../../server/users";
import ButtonLoading from "../../Button/ButtonLoading";
import Card from "../../Card";
import { getUserColorByStatus } from "../../../server/users/helpers";

type UserRowProps = {
  user: User;
  isLoading?: boolean;
};

const UserRow = ({ user, isLoading }: UserRowProps) => {
  const theme = useTheme();

  const navigate = useNavigate();

  const handleDetailsClick = () => navigate(`/${user.id}`);

  return (
    <Card
      isLoading={isLoading}
      sx={{
        padding: "5px 20px",
        borderRadius: "0",
      }}
    >
      <Grid container alignItems="center" columnGap="30px">
        <Grid item display="flex" alignItems="center" columnGap="20px" xs={3}>
          <Avatar src={""} sx={{ width: "25px", height: "25px" }}>
            <Person2Icon color="primary" fontSize="small" />
          </Avatar>
          <Grid item>
            <Card.Title title={user.name} sx={theme.mixins.textEllipsis} />
          </Grid>
        </Grid>

        <Grid item xs={3}>
          <Typography>{user.email}</Typography>
        </Grid>

        <Grid item xs={1}>
          <Typography>{user.gender}</Typography>
        </Grid>

        <Grid item xs={1}>
          <Typography
            variant="body2"
            color={getUserColorByStatus(user.status)}
            textTransform="uppercase"
          >
            {user.status}
          </Typography>
        </Grid>

        <Grid
          item
          display="flex"
          alignItems="center"
          columnGap="20px"
          justifyContent="flex-end"
          flex="auto"
        >
          <ButtonLoading label="Details" onClick={handleDetailsClick} />
        </Grid>
      </Grid>
    </Card>
  );
};

export default UserRow;
