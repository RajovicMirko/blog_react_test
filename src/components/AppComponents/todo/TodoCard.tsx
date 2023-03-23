import { Grid, Typography, useTheme } from "@mui/material";
import { toast } from "react-toastify";
import {
  updaterFunctionRemove,
  updaterFunctionUpdate,
} from "src/server/api/helpers";
import {
  getTodoColorByStatus,
  Todo,
  TodoStatus,
  useTodo,
} from "src/server/api/todos";
import { usersHttpUrls } from "src/server/api/users/types";
import useToggle from "../../../hooks/useToggle";
import ButtonLoading from "../../Button/ButtonLoading";
import Card from "../../Card";
import Modal from "../../Modal";
import ConfirmModal from "../../Modal/ConfirmModal";
import TodoForm from "./TodoForm";

type TodoCardProps = {
  todo: Todo;
  isLoadingDelete?: boolean;
  isLoading?: boolean;
};

const TodoCard = ({ todo, isLoading }: TodoCardProps) => {
  const theme = useTheme();
  const [isEditModalOpen, toggleEditModal] = useToggle();
  const [isConfirmDeleteOpen, toggleDeleteConfirmation] = useToggle();
  const isPending = todo.status === TodoStatus.pending;
  const isCompleted = todo.status === TodoStatus.completed;

  const { update, isLoadingUpdate, remove, isLoadingRemove, updateMany } =
    useTodo({});

  const handleEditTodo = (formData: Todo) => {
    update(formData, {
      onSuccess: (response) => {
        updateMany(
          usersHttpUrls.useUserTodos,
          updaterFunctionUpdate<Todo>(response)
        );

        toggleEditModal();
        toast.success("Todo successfully updated");
      },
    });
  };

  const handleRemoveTodo = () => {
    remove(
      { id: todo?.id },
      {
        onSuccess: () => {
          updateMany(
            usersHttpUrls.useUserTodos,
            updaterFunctionRemove<Todo>(todo?.id as number)
          );

          toggleDeleteConfirmation();
          toast.success("Todo successfully deleted");
        },
      }
    );
  };

  return (
    <Card isLoading={isLoading} sx={{ minHeight: "190px" }}>
      <Grid container rowGap="10px">
        <Card.Title title={todo.title} sx={theme.mixins.textEllipsis} />

        {isPending && (
          <Grid container columnGap="14px" flexDirection="row">
            <Card.Description inline label="Due time">
              date
            </Card.Description>
          </Grid>
        )}

        <Grid container>
          <Card.Description inline label="Status">
            <Typography
              variant="body2"
              color={getTodoColorByStatus(todo.status)}
              textTransform="uppercase"
            >
              {todo.status}
            </Typography>
          </Card.Description>
        </Grid>
      </Grid>

      <Card.Actions>
        <ButtonLoading label="Edit" color="info" onClick={toggleEditModal} />

        {isCompleted && (
          <ButtonLoading
            label="Delete"
            color="error"
            onClick={toggleDeleteConfirmation}
          />
        )}
      </Card.Actions>

      <Modal
        title="Edit todo"
        open={isEditModalOpen}
        onClose={toggleEditModal}
        persistent={isLoadingUpdate}
      >
        <TodoForm
          userId={todo?.user_id}
          todo={todo}
          onSubmit={handleEditTodo}
          isLoading={isLoadingUpdate}
        />
      </Modal>

      <ConfirmModal
        title="Delete Todo"
        description={`You are about to delete todo`}
        open={isConfirmDeleteOpen}
        onClose={toggleDeleteConfirmation}
        okText="Yes, delete todo"
        onOk={handleRemoveTodo}
        isLoading={isLoadingRemove}
      />
    </Card>
  );
};

export default TodoCard;
