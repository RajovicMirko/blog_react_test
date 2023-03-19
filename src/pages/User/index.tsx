import { useState } from "react";
import { useParams } from "react-router-dom";
import Modal from "src/components/Modal";
import GridPagination from "src/components/GridPagination";
import SpeedDialTooltip from "src/components/SpeedDialTooltip";
import TabSwitcher from "src/components/TabSwitcher";
import useLoading from "src/context/LoadingContext";
import users from "src/server/api/users";
import posts, { Post } from "src/server/api/posts";
import todos, { Todo } from "src/server/api/todos";
import { Entity } from "src/server/api/users/types";
import { actions, TAB_VIEW_OPTIONS } from "./constants";
import UserDetails from "./UserDetails";
import { toast } from "react-toastify";
import PostCard from "src/components/AppComponents/post/PostCard";
import TodoForm from "src/components/AppComponents/todo/TodoForm";
import TodoCard from "src/components/AppComponents/todo/TodoCard";
import PostForm from "src/components/AppComponents/post/PostForm";

const UserPage = () => {
  const { id } = useParams();
  const { isAppLoading, handleLoading } = useLoading();

  const [entity, setEntity] = useState(Entity.posts);
  const [displayModalKey, setDisplayModalKey] = useState("");

  const { data: user, isError: isErrorUser } = users.one({
    id: Number(id),
  });

  const { create: createPost, isLoadingCreate: isLoadingCreatePost } =
    posts.one({});

  const { create: createTodo, isLoadingCreate: isLoadingCreateTodo } =
    todos.one({});

  const {
    data: userPosts,
    isInitialLoading: isInitialLoadingPosts,
    isLoading: isLoadingPosts,
    isError: isErrorPosts,
    pagination: paginationPosts,
    isDataEmpty: isDataEmptyPosts,
    refetch: refetchPosts,
  } = users.oneData({
    id: Number(id),
    entity: Entity.posts,
    enabled: !!user?.id && entity === Entity.posts,
  });

  const {
    data: userTodos,
    isInitialLoading: isInitialLoadingTodos,
    isLoading: isLoadingTodos,
    isError: isErrorTodos,
    pagination: paginationTodos,
    isDataEmpty: isDataEmptyTodos,
    refetch: refetchTodos,
  } = users.oneData({
    id: Number(id),
    entity: Entity.todos,
    enabled: !!user?.id && entity === Entity.todos,
  });

  const handleTabChange = (id: Entity) => setEntity(id);
  const handleSpeedDialActionClick = (id: Entity) => setDisplayModalKey(id);
  const handleModalClose = () => setDisplayModalKey("");

  // POST HANDLERS
  const handleCreatePost = (formData: Post) => {
    createPost(formData, {
      onSuccess: () => {
        if (entity !== Entity.posts) {
          handleTabChange(Entity.posts);
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
        if (entity !== Entity.todos) {
          handleTabChange(Entity.todos);
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

  handleLoading("user-page", !user && !isErrorUser);

  const CardComponent = (data: Post & Todo) => {
    switch (entity) {
      case Entity.posts:
        return <PostCard post={data} onDeleteSuccess={handleDeletePost} />;
      case Entity.todos:
        return (
          <TodoCard
            todo={data}
            onEditSuccess={handleEditTodo}
            onDeleteSuccess={handleDeleteTodo}
          />
        );
      default:
        return <div />;
    }
  };

  if (isAppLoading) return null;

  return (
    <>
      <UserDetails user={user} />

      <TabSwitcher
        activeTab={entity}
        options={TAB_VIEW_OPTIONS}
        onChange={handleTabChange}
      />

      {entity === Entity.posts && (
        <GridPagination
          data={userPosts}
          card={CardComponent}
          pagination={paginationPosts}
          isLoading={(isInitialLoadingPosts || isLoadingPosts) && !isErrorPosts}
          isDataEmpty={isDataEmptyPosts || !userPosts?.length}
          emptyDataText={`No ${entity} data`}
        />
      )}

      {entity === Entity.todos && (
        <GridPagination
          data={userTodos}
          card={CardComponent}
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
        open={displayModalKey === Entity.posts}
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
        open={displayModalKey === Entity.todos}
        onClose={handleModalClose}
        persistent={isLoadingCreateTodo}
      >
        <TodoForm
          userId={user?.id}
          onSubmit={handleCreateTodo}
          isLoading={isLoadingCreateTodo}
        />
      </Modal>
    </>
  );
};

export default UserPage;
