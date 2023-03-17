import { Grid, Typography, useTheme } from "@mui/material";
import useToggle from "../../../hooks/useToggle";
import todos, { Todo } from "src/server/api/todos";
import { getTodoColorByStatus } from "src/server/api/todos/helpers";
import { OneResponse, TodoStatus } from "src/server/api/todos/types";
import ButtonLoading from "../../Button/ButtonLoading";
import Card from "../../Card";
import TodoForm from "./TodoForm";
import Modal from "../../Modal";
import ConfirmModal from "../../Modal/ConfirmModal";

type TodoCardProps = {
  todo: Todo;
  onEditSuccess: (response?: OneResponse) => void;
  onDeleteSuccess: (id: Todo["id"]) => void;
  isLoadingDelete?: boolean;
  isLoading?: boolean;
};

const TodoCard = ({
  todo,
  isLoading,
  onEditSuccess,
  onDeleteSuccess,
}: TodoCardProps) => {
  const theme = useTheme();
  const [isEditModalOpen, toggleEditModal] = useToggle();
  const [isConfirmDeleteOpen, toggleDeleteConfirmation] = useToggle();
  const isPending = todo.status === TodoStatus.pending;

  const { update, isLoadingUpdate, remove, isLoadingRemove } = todos.one({});

  const handleEditTodo = (formData: Todo) => {
    update(formData, {
      onSuccess: (response) => {
        toggleEditModal();
        onEditSuccess(response);
      },
    });
  };

  const handleRemoveTodo = () => {
    remove(
      { id: todo?.id },
      {
        onSuccess: () => {
          toggleDeleteConfirmation();
          onDeleteSuccess(todo.id);
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

      {!!onDeleteSuccess && (
        <Card.Actions>
          <ButtonLoading label="Edit" color="info" onClick={toggleEditModal} />
          <ButtonLoading
            label="Delete"
            color="error"
            onClick={toggleDeleteConfirmation}
          />
        </Card.Actions>
      )}

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
