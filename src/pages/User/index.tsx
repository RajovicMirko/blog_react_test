import { useState } from "react";
import { useParams } from "react-router-dom";
import Modal from "src/components/Modal";
import GridPagination from "src/components/GridPagination";
import SpeedDialTooltip from "src/components/SpeedDialTooltip";
import TabSwitcher from "src/components/TabSwitcher";
import useLoading from "src/context/LoadingContext";
import users from "src/server/users";
import { Entity } from "src/server/users/types";
import { actions, TAB_VIEW_OPTIONS } from "./constants";
import UserDetails from "./UserDetails";
import posts, { Post } from "src/server/posts";
import { toast } from "react-toastify";
import PostCard from "src/components/AppComponents/post/PostCard";
import todos, { Todo } from "src/server/todos";
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
    data: userTabData,
    isInitialLoading: isInitialLoadingUserData,
    isLoading: isLoadingUserData,
    isError: isErrorUserData,
    pagination,
    isDataEmpty,
    refetch: refetchUserEntityData,
  } = users.oneData({ id: Number(id), entity, enabled: !!user?.id });

  const handleTabChange = (id: Entity) => setEntity(id);

  const handleAction = (id: Entity) => setDisplayModalKey(id);
  const handleModalClose = () => setDisplayModalKey("");

  const handleCreatePost = (formData: Post) => {
    createPost(formData, {
      onSuccess: () => {
        if (entity !== Entity.posts) {
          handleTabChange(Entity.posts);
        }
        refetchUserEntityData();
        handleModalClose();
        toast.success("Post successfully added");
      },
    });
  };

  const handleCreateTodo = (formData: Todo) => {
    createTodo(formData, {
      onSuccess: () => {
        if (entity !== Entity.todos) {
          handleTabChange(Entity.todos);
        }
        refetchUserEntityData();
        handleModalClose();
        toast.success("Todo successfully added");
      },
    });
  };

  const handleEditTodo = () => {
    refetchUserEntityData();
    toast.success("Todo successfully updated");
  };

  const handleDeletePost = () => {
    refetchUserEntityData();
    toast.success("Post successfully deleted");
  };

  const handleDeleteTodo = () => {
    refetchUserEntityData();
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

      <GridPagination
        useSwitch
        data={userTabData}
        card={CardComponent}
        pagination={pagination}
        isLoading={
          (isInitialLoadingUserData || isLoadingUserData) && !isErrorUserData
        }
        isDataEmpty={isDataEmpty || !userTabData?.length}
        emptyDataText={`No ${entity} data`}
      />

      <SpeedDialTooltip
        actions={actions}
        onClick={handleAction}
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
