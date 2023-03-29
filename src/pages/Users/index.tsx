import AddIcon from "@mui/icons-material/Add";
import { Fab, useTheme } from "@mui/material";
import UserCard from "src/components/AppComponents/user/UserCard";
import UserModalForm from "src/components/AppComponents/user/UserModalForm";
import UserRow from "src/components/AppComponents/user/UserRow";
import GridPagination from "src/components/GridPagination";
import ScrollWrapperPage from "src/components/Layout/PageWrapper/ScrollWrapperPage";
import useAuthContext from "src/context/AuthContext";
import useLoading from "src/context/LoadingContext";
import useToggle from "src/hooks/useToggle";
import { User, useUsers } from "src/server/api/users";

const UsersPage = () => {
  const { isAuthenticated } = useAuthContext();

  const theme = useTheme();
  const { handleLoading } = useLoading();

  const [isOpenedUserModal, toggleIsOpenedUserModal] = useToggle();

  const {
    data: usersData,
    isLoading,
    isError,
    pagination,
    isDataEmpty,
  } = useUsers({
    options: {
      enabled: isAuthenticated,
    },
  });

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

      <UserModalForm
        open={isOpenedUserModal}
        onClose={toggleIsOpenedUserModal}
      />

      <Fab
        color="primary"
        sx={theme.mixins.floatButtonPosition}
        onClick={toggleIsOpenedUserModal}
        aria-label="Add new user"
      >
        <AddIcon />
      </Fab>
    </ScrollWrapperPage>
  );
};

export default UsersPage;
