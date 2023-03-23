import { Grid, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UserForm from "src/components/AppComponents/user/UserForm";
import ButtonLoading from "src/components/Button/ButtonLoading";
import Card from "src/components/Card";
import Modal from "src/components/Modal";
import ConfirmModal from "src/components/Modal/ConfirmModal";
import useToggle from "src/hooks/useToggle";
import { RoutePath } from "src/router/routesMap";
import {
  updaterFunctionRemove,
  updaterFunctionUpdate,
} from "src/server/api/helpers";
import { User, useUser } from "src/server/api/users";
import { usersHttpUrls } from "src/server/api/users/types";

type UserDetailsProps = {
  user?: User;
};

const UserDetails = ({ user }: UserDetailsProps) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [isOpenEditUserModal, toggleEditUserModal] = useToggle();
  const [isOpenDeleteConfirmation, toggleDeleteConfirmation] = useToggle();

  const {
    update,
    isLoadingUpdate,
    remove,
    isLoadingRemove,
    updateOne,
    updateMany,
  } = useUser({
    id: user?.id,
    options: {
      enabled: !!user?.id,
    },
  });

  const handleSubmitEditUser = (formUser: User) => {
    update(formUser, {
      onSuccess: (response) => {
        updateOne(response, user?.id as number);
        updateMany(
          usersHttpUrls.useUsers,
          updaterFunctionUpdate<User>(response)
        );
        toast.success("User successfully updated");
        toggleEditUserModal();
      },
    });
  };

  const handleSubmitDeleteUser = () => {
    remove(
      { id: user?.id },
      {
        onSuccess: () => {
          updateMany(
            usersHttpUrls.useUsers,
            updaterFunctionRemove<User>(user?.id as number)
          );
          toast.success("User successfully deleted");
          navigate(RoutePath.users);
        },
      }
    );
  };

  if (!user?.id) return null;

  return (
    <Grid container padding="30px 40px">
      <Grid container item xs={12} md={6}>
        <Grid item flex={1}>
          <Typography variant="h4" mb="30px" sx={theme.mixins.textEllipsis}>
            ({user?.id}) {user?.name}
          </Typography>

          <Grid maxWidth={500}>
            <Card.Description inline label="Email">
              {user?.email}
            </Card.Description>
            <Card.Description inline label="Status">
              {user?.status}
            </Card.Description>
            <Card.Description inline label="Gender">
              {user?.gender}
            </Card.Description>
          </Grid>
        </Grid>
      </Grid>

      <Grid
        container
        item
        spacing={3}
        xs={12}
        md={6}
        justifyContent="flex-end"
        alignItems="flex-end"
      >
        <Grid item xs={12} md={3}>
          <ButtonLoading
            fullWidth
            variant="contained"
            label="Edit"
            color="info"
            onClick={toggleEditUserModal}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <ButtonLoading
            fullWidth
            variant="outlined"
            label="Delete"
            color="error"
            onClick={toggleDeleteConfirmation}
          />
        </Grid>
      </Grid>

      <Modal
        title="Edit User"
        open={isOpenEditUserModal}
        onClose={toggleEditUserModal}
        persistent={isLoadingUpdate}
      >
        <UserForm
          user={user}
          onSubmit={handleSubmitEditUser}
          isLoading={isLoadingUpdate}
        />
      </Modal>

      <ConfirmModal
        title="Delete User"
        description={`You are about to delete user: ${user?.name}`}
        open={isOpenDeleteConfirmation}
        onClose={toggleDeleteConfirmation}
        okText="Yes, delete user"
        onOk={handleSubmitDeleteUser}
        isLoading={isLoadingRemove}
      />
    </Grid>
  );
};

export default UserDetails;
