import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import users, { UserEntity } from "src/server/api/users";
import posts, { Post } from "src/server/api/posts";
import todos, { Todo } from "src/server/api/todos";
import { actions, TAB_VIEW_OPTIONS } from "./constants";

import Modal from "src/components/Modal";
import GridPagination from "src/components/GridPagination";
import SpeedDialTooltip from "src/components/SpeedDialTooltip";
import TabSwitcher from "src/components/TabSwitcher";
import useLoading from "src/context/LoadingContext";
import UserDetails from "./UserDetails";
import PostCard from "src/components/AppComponents/post/PostCard";
import TodoForm from "src/components/AppComponents/todo/TodoForm";
import TodoCard from "src/components/AppComponents/todo/TodoCard";
import PostForm from "src/components/AppComponents/post/PostForm";
import ScrollWrapperPage from "src/components/Layout/PageWrapper/ScrollWrapperPage";

const UserPage = () => {
  const { id } = useParams();
  const { isAppLoading, handleLoading } = useLoading();

  const [entity, setEntity] = useState(UserEntity.posts);
  const [displayModalKey, setDisplayModalKey] = useState("");

  const { data: user, isError: isErrorUser } = users.one({
    id: Number(id),
  });

  const { create: createPost, isLoadingCreate: isLoadingCreatePost } =
    posts.one();

  const { create: createTodo, isLoadingCreate: isLoadingCreateTodo } =
    todos.one();

  const {
    data: userPosts,
    isInitialLoading: isInitialLoadingPosts,
    isLoading: isLoadingPosts,
    isError: isErrorPosts,
    pagination: paginationPosts,
    isDataEmpty: isDataEmptyPosts,
    refetch: refetchPosts,
  } = users.oneEntity({
    id: Number(id),
    entity: UserEntity.posts,
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
    refetch: refetchTodos,
  } = users.oneEntity({
    id: Number(id),
    entity: UserEntity.todos,
    options: {
      enabled: !!user?.id && entity === UserEntity.todos,
    },
  });

  const handleTabChange = (id: UserEntity) => setEntity(id);
  const handleSpeedDialActionClick = (id: UserEntity) => setDisplayModalKey(id);
  const handleModalClose = () => setDisplayModalKey("");

  // POST HANDLERS
  const handleCreatePost = (formData: Post) => {
    createPost(formData, {
      onSuccess: () => {
        if (entity !== UserEntity.posts) {
          handleTabChange(UserEntity.posts);
        }
        refetchPosts();
        handleModalClose();
        toast.success("Post successfully added");
      },
    });
  };

  const handleDeletePost = () => {
    refetchPosts();
    toast.success("Post successfully deleted");
  };

  // TODO HANDLERS
  const handleCreateTodo = (formData: Todo) => {
    createTodo(formData, {
      onSuccess: () => {
        if (entity !== UserEntity.todos) {
          handleTabChange(UserEntity.todos);
        }
        refetchTodos();
        handleModalClose();
        toast.success("Todo successfully added");
      },
    });
  };

  const handleEditTodo = () => {
    refetchTodos();
    toast.success("Todo successfully updated");
  };

  const handleDeleteTodo = () => {
    refetchTodos();
    toast.success("Todo successfully deleted");
  };

  const CardPost = (data: Post) => (
    <PostCard post={data} onDeleteSuccess={handleDeletePost} />
  );

  const CardTodo = (data: Todo) => (
    <TodoCard
      todo={data}
      onEditSuccess={handleEditTodo}
      onDeleteSuccess={handleDeleteTodo}
    />
  );

  handleLoading("user-page", !user && !isErrorUser);

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
