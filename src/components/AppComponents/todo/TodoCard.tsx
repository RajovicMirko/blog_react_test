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
import { DateFormats, formatDateToString } from "src/utils/date";
import useToggle from "../../../hooks/useToggle";
import ButtonLoading from "../../Button/ButtonLoading";
import Card from "../../Card";
import ConfirmModal from "../../Modal/ConfirmModal";
import TodoModalForm from "./TodoModalForm";

type TodoCardProps = {
  todo: Todo;
};

const TodoCard = ({ todo }: TodoCardProps) => {
  const theme = useTheme();
  const [isEditModalOpen, toggleEditModal] = useToggle();
  const [isConfirmDeleteOpen, toggleDeleteConfirmation] = useToggle();
  const isPending = todo.status === TodoStatus.pending;
  const isCompleted = todo.status === TodoStatus.completed;

  const {
    update,
    isLoadingUpdate,
    remove,
    isLoadingRemove,
    updateOne,
    updateMany,
  } = useTodo({});

  const handleEdit = () => {
    update(
      { ...todo, status: TodoStatus.completed },
      {
        onSuccess: (response) => {
          updateOne(response, todo?.id as number);
          updateMany(
            usersHttpUrls.useUserTodos,
            updaterFunctionUpdate<Todo>(response)
          );
          toast.success("Todo successfully updated");
        },
      }
    );
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
    <Card sx={{ minHeight: "190px" }}>
      <Grid container rowGap="10px">
        <Card.Title title={todo.title} sx={theme.mixins.textEllipsis} />

        {isPending && (
          <Grid container columnGap="14px" flexDirection="row">
            <Card.Description inline label="Due time">
              {formatDateToString(todo.due_on, DateFormats.dateTime)}
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
        <ButtonLoading
          label="Edit"
          color="info"
          onClick={toggleEditModal}
          disabled={isLoadingUpdate || isLoadingRemove}
        />

        {isPending && (
          <ButtonLoading
            label="Complete Task"
            color="success"
            onClick={handleEdit}
            disabled={isLoadingUpdate || isLoadingRemove}
            isLoading={isLoadingUpdate}
          />
        )}

        {isCompleted && (
          <ButtonLoading
            label="Delete"
            color="error"
            onClick={toggleDeleteConfirmation}
            disabled={isLoadingUpdate || isLoadingRemove}
            isLoading={isLoadingRemove}
          />
        )}
      </Card.Actions>

      <TodoModalForm
        todo={todo}
        userId={todo?.user_id}
        open={isEditModalOpen}
        onClose={toggleEditModal}
      />

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
