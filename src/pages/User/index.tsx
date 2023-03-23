import { useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import { Post, usePost } from "src/server/api/posts";
import { Todo, useTodo } from "src/server/api/todos";
import {
  UserEntity,
  useUser,
  useUserPosts,
  useUserTodos,
} from "src/server/api/users";
import { actions, TAB_VIEW_OPTIONS } from "./constants";

import PostCard from "src/components/AppComponents/post/PostCard";
import PostForm from "src/components/AppComponents/post/PostForm";
import TodoCard from "src/components/AppComponents/todo/TodoCard";
import TodoForm from "src/components/AppComponents/todo/TodoForm";
import GridPagination from "src/components/GridPagination";
import ScrollWrapperPage from "src/components/Layout/PageWrapper/ScrollWrapperPage";
import Modal from "src/components/Modal";
import SpeedDialTooltip from "src/components/SpeedDialTooltip";
import TabSwitcher from "src/components/TabSwitcher";
import useAuthContext from "src/context/AuthContext";
import useLoading from "src/context/LoadingContext";
import { updaterFunctionCreate } from "src/server/api/helpers";
import { usersHttpUrls } from "src/server/api/users/types";
import UserDetails from "./UserDetails";

const UserPage = () => {
  const {
    state: { id },
  } = useLocation();

  const { isAuthenticated } = useAuthContext();
  const { isAppLoading, handleLoading } = useLoading();

  const [entity, setEntity] = useState(UserEntity.posts);
  const [displayModalKey, setDisplayModalKey] = useState("");

  const { data: user, isError: isErrorUser } = useUser({
    id: Number(id),
    options: {
      enabled: isAuthenticated,
    },
  });

  const {
    create: createPost,
    isLoadingCreate: isLoadingCreatePost,
    updateMany: updateManyPost,
  } = usePost({});

  const {
    create: createTodo,
    isLoadingCreate: isLoadingCreateTodo,
    updateMany: updateManyTodo,
  } = useTodo({});

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

  const handleCreatePost = (formData: Post) => {
    createPost(formData, {
      onSuccess: (response) => {
        if (entity !== UserEntity.posts) {
          handleTabChange(UserEntity.posts);
        }
        updateManyPost(
          usersHttpUrls.useUserPosts,
          updaterFunctionCreate<Post>(response)
        );
        handleModalClose();
        toast.success("Post successfully added");
      },
    });
  };

  const handleCreateTodo = (formData: Todo) => {
    createTodo(formData, {
      onSuccess: (response) => {
        if (entity !== UserEntity.todos) {
          handleTabChange(UserEntity.todos);
        }
        updateManyTodo(
          usersHttpUrls.useUserTodos,
          updaterFunctionCreate<Todo>(response)
        );
        handleModalClose();
        toast.success("Todo successfully added");
      },
    });
  };

  const CardPost = (data: Post) => <PostCard post={data} />;
  const CardTodo = (data: Todo) => <TodoCard todo={data} />;

  handleLoading(
    "user-page",
    (!user && !isErrorUser) || (!userPosts && !userPosts)
  );

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

      <Modal
        title="Create new post"
        open={displayModalKey === UserEntity.posts}
        onClose={handleModalClose}
        persistent={isLoadingCreatePost}
      >
        <PostForm
          userId={user?.id}
          onSubmit={handleCreatePost}
          isLoading={isLoadingCreatePost}
        />
      </Modal>

      <Modal
        title="Add new todo"
        open={displayModalKey === UserEntity.todos}
        onClose={handleModalClose}
        persistent={isLoadingCreateTodo}
      >
        <TodoForm
          userId={user?.id}
          onSubmit={handleCreateTodo}
          isLoading={isLoadingCreateTodo}
        />
      </Modal>
    </ScrollWrapperPage>
  );
};

export default UserPage;
