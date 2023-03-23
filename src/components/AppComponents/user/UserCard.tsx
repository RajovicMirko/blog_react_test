import Person2Icon from "@mui/icons-material/Person2";
import { Avatar, Grid, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "src/router/routesMap";
import { getUserColorByStatus, User } from "src/server/api/users";
import ButtonLoading from "../../Button/ButtonLoading";
import Card from "../../Card";

type UserCardProps = {
  user: User;
};

const UserCard = ({ user }: UserCardProps) => {
  const theme = useTheme();

  const navigate = useNavigate();

  const handleDetailsClick = () =>
    navigate(RoutePath.user, {
      state: {
        id: user.id,
      },
    });

  return (
    <Card sx={{ minHeight: "250px" }}>
      <Grid container rowGap="10px">
        <Grid
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          columnGap="14px"
          mb="20px"
          width="100%"
        >
          <Card.Title title={user.name} sx={theme.mixins.textEllipsis} />
          <Avatar src={""} sx={{ width: "50px", height: "50px" }}>
            <Person2Icon color="primary" fontSize="large" />
          </Avatar>
        </Grid>

        <Grid container rowGap="14px">
          <Card.Description inline label="Email">
            {user.email}
          </Card.Description>
          <Card.Description inline label="Gender">
            {user.gender}
          </Card.Description>
        </Grid>
      </Grid>

      <Card.Actions>
        <ButtonLoading
          label="Details"
          onClick={handleDetailsClick}
          aria-label="Details"
        />
        <Typography
          variant="body2"
          color={getUserColorByStatus(user.status)}
          textTransform="uppercase"
        >
          {user.status}
        </Typography>
      </Card.Actions>
    </Card>
  );
};

export default UserCard;
