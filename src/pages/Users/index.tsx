import AddIcon from "@mui/icons-material/Add";
import { Fab, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UserCard from "src/components/AppComponents/user/UserCard";
import UserForm from "src/components/AppComponents/user/UserForm";
import UserRow from "src/components/AppComponents/user/UserRow";
import GridPagination from "src/components/GridPagination";
import ScrollWrapperPage from "src/components/Layout/PageWrapper/ScrollWrapperPage";
import Modal from "src/components/Modal";
import useAuthContext from "src/context/AuthContext";
import useLoading from "src/context/LoadingContext";
import useToggle from "src/hooks/useToggle";
import { RoutePath } from "src/router/routesMap";
import users, { User } from "src/server/api/users";

const UsersPage = () => {
  const { isAuthenticated } = useAuthContext();

  const theme = useTheme();
  const navigate = useNavigate();
  const { handleLoading } = useLoading();

  const [isOpenCreateUserModal, toggleCreateUserModal] = useToggle();

  const {
    data: usersData,
    isLoading,
    isError,
    pagination,
    isDataEmpty,
    refetch: refetchUsers,
  } = users.many({
    options: {
      enabled: isAuthenticated,
    },
  });

  const { create, isLoadingCreate, updateQueryData } = users.one();

  const handleCreateUser = (userData: User) => {
    create(userData, {
      onSuccess: (response) => {
        updateQueryData(response);
        toggleCreateUserModal();
        refetchUsers();
        navigate(RoutePath.user, { state: { id: response.data.data.id } });
        toast.success("User successfully added");
      },
    });
  };

  handleLoading("users_page", !usersData && !isError);

  const CardComponent = (user: User, isTableView: boolean) =>
    isTableView ? <UserRow user={user} /> : <UserCard user={user} />;

  if (!usersData && !isError) return null;

  return (
    <ScrollWrapperPage>
      <GridPagination
        data={usersData}
        card={CardComponent}
        isLoading={isLoading}
        pagination={pagination}
        isDataEmpty={isDataEmpty}
        emptyDataText="No users data"
        list
        useSwitch
      />

      <Modal
        title="Create User"
        open={isOpenCreateUserModal}
        onClose={toggleCreateUserModal}
        persistent={isLoadingCreate}
      >
        <UserForm onSubmit={handleCreateUser} isLoading={isLoadingCreate} />
      </Modal>

      <Fab
        color="primary"
        sx={theme.mixins.floatButtonPosition}
        onClick={toggleCreateUserModal}
        aria-label="Add new user"
      >
        <AddIcon />
      </Fab>
    </ScrollWrapperPage>
  );
};

export default UsersPage;
