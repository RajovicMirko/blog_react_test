import { useState } from "react";
import { useLocation } from "react-router-dom";
import PostCard from "src/components/AppComponents/post/PostCard";
import PostModalForm from "src/components/AppComponents/post/PostModalForm";
import TodoCard from "src/components/AppComponents/todo/TodoCard";
import TodoModalForm from "src/components/AppComponents/todo/TodoModalForm";
import GridPagination from "src/components/GridPagination";
import ScrollWrapperPage from "src/components/Layout/PageWrapper/ScrollWrapperPage";
import SpeedDialTooltip from "src/components/SpeedDialTooltip";
import TabSwitcher from "src/components/TabSwitcher";
import useAuthContext from "src/context/AuthContext";
import useLoading from "src/context/LoadingContext";
import { Post } from "src/server/api/posts";
import { Todo } from "src/server/api/todos";
import {
  UserEntity,
  useUser,
  useUserPosts,
  useUserTodos,
} from "src/server/api/users";
import {
  actions,
  TAB_VIEW_OPTIONS,
} from "../../components/AppComponents/user/constants";
import UserDetails from "../../components/AppComponents/user/UserDetails";

const UserPage = () => {
  const {
    state: { id },
  } = useLocation();

  const { isAuthenticated } = useAuthContext();
  const { isAppLoading, handleLoading } = useLoading();

  const [entity, setEntity] = useState(UserEntity.todos);
  const [displayModalKey, setDisplayModalKey] = useState("");

  const {
    data: user,
    isSuccess: isSuccessUser,
    isError: isErrorUser,
  } = useUser({
    id: Number(id),
    options: {
      enabled: isAuthenticated,
    },
  });

  const {
    data: userPosts,
    isInitialLoading: isInitialLoadingPosts,
    isLoading: isLoadingPosts,
    isError: isErrorPosts,
    pagination: paginationPosts,
    isDataEmpty: isDataEmptyPosts,
  } = useUserPosts({
    userId: id,
    options: {
      enabled: !!user?.id && entity === UserEntity.posts,
    },
  });

  const {
    data: userTodos,
    isInitialLoading: isInitialLoadingTodos,
    isLoading: isLoadingTodos,
    isError: isErrorTodos,
    pagination: paginationTodos,
    isDataEmpty: isDataEmptyTodos,
  } = useUserTodos({
    userId: id,
    options: {
      enabled: !!user?.id && entity === UserEntity.todos,
    },
  });

  const handleTabChange = (id: UserEntity) => setEntity(id);
  const handleSpeedDialActionClick = (id: UserEntity) => setDisplayModalKey(id);
  const handleModalClose = () => setDisplayModalKey("");

  const onPostSuccess = () => {
    if (entity !== UserEntity.posts) {
      handleTabChange(UserEntity.posts);
    }
  };

  const onTodoSuccess = () => {
    if (entity !== UserEntity.todos) {
      handleTabChange(UserEntity.todos);
    }
  };

  const CardPost = (data: Post) => <PostCard post={data} />;
  const CardTodo = (data: Todo) => <TodoCard todo={data} />;

  handleLoading("user-page", !user && !isErrorUser && !isSuccessUser);

  if (isAppLoading) return null;

  return (
    <ScrollWrapperPage>
      <UserDetails user={user} />

      <TabSwitcher
        activeTab={entity}
        options={TAB_VIEW_OPTIONS}
        onChange={handleTabChange}
      />

      {entity === UserEntity.posts && (
        <GridPagination
          data={userPosts}
          card={CardPost}
          pagination={paginationPosts}
          isLoading={(isInitialLoadingPosts || isLoadingPosts) && !isErrorPosts}
          isDataEmpty={isDataEmptyPosts || !userPosts?.length}
          emptyDataText={`No ${entity} data`}
        />
      )}

      {entity === UserEntity.todos && (
        <GridPagination
          data={userTodos}
          card={CardTodo}
          pagination={paginationTodos}
          isLoading={(isInitialLoadingTodos || isLoadingTodos) && !isErrorTodos}
          isDataEmpty={isDataEmptyTodos || !userTodos?.length}
          emptyDataText={`No ${entity} data`}
        />
      )}

      <SpeedDialTooltip
        actions={actions}
        onClick={handleSpeedDialActionClick}
        ariaLabel="Blog tab actions"
        tooltipWidth={160}
      />

      <PostModalForm
        userId={user?.id}
        open={displayModalKey === UserEntity.posts}
        onClose={handleModalClose}
        onSuccess={onPostSuccess}
      />

      <TodoModalForm
        userId={user?.id}
        open={displayModalKey === UserEntity.todos}
        onClose={handleModalClose}
        onSuccess={onTodoSuccess}
      />
    </ScrollWrapperPage>
  );
};

export default UserPage;
