import { Grid } from "@mui/material";
import { omitBy } from "lodash";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import InputDateTime from "src/components/Form/components/InputDateTime";
import {
  updaterFunctionCreate,
  updaterFunctionUpdate,
} from "src/server/api/helpers";

import { Todo, useTodo } from "src/server/api/todos";
import { User } from "src/server/api/users";
import { usersHttpUrls } from "src/server/api/users/types";

import ButtonLoading from "../../../Button/ButtonLoading";
import AppForm, { InputRadioGroup, InputText } from "../../../Form";
import { isRequired, minLen, validation } from "../../../Form/validations";
import { statusOptions } from "./constants";

export type TodoFormProps = {
  onSuccess: (formData: Todo) => void;
  onPreSubmit?: () => void;
  onPostSubmit?: () => void;
  userId?: User["id"];
  todo?: Todo;
};

const TodoForm = ({
  todo,
  userId,
  onSuccess,
  onPreSubmit,
  onPostSubmit,
}: TodoFormProps) => {
  const {
    create,
    isLoadingCreate,
    update,
    isLoadingUpdate,
    updateOne,
    updateMany,
  } = useTodo();

  const isLoading = isLoadingCreate || isLoadingUpdate;

  const methods = useForm<Todo>({
    mode: "onChange",
    defaultValues: {
      user_id: userId,
      id: todo?.id,
      title: todo?.title ?? "",
      due_on: todo?.due_on ?? "",
      status: todo?.status,
    },
  });

  const handleCreate = (todoData: Todo) => {
    create(todoData, {
      onSuccess: (response) => {
        updateOne(response, response?.data?.data?.id as number);
        updateMany(
          usersHttpUrls.useUserTodos,
          updaterFunctionCreate<Todo>(response)
        );
        toast.success("Todo successfully added");
        onSuccess?.(todoData);
      },
      onSettled: () => onPostSubmit?.(),
    });
  };

  const handleEdit = (todoData: Todo) => {
    update(todoData, {
      onSuccess: (response) => {
        updateOne(response, todo?.id as number);
        updateMany(
          usersHttpUrls.useUserTodos,
          updaterFunctionUpdate<Todo>(response)
        );
        toast.success("Todo successfully updated");
        onSuccess?.(todoData);
      },
      onSettled: () => onPostSubmit?.(),
    });
  };

  const handleOnSubmit = (formData: User) => {
    onPreSubmit?.();
    const payload = omitBy(formData, (value: any) => !value) as Todo;
    const fn = todo?.id ? handleEdit : handleCreate;

    fn(payload);
  };

  return (
    <AppForm {...methods} onSubmit={handleOnSubmit} isLoading={isLoading}>
      <Grid container flexDirection="column" rowGap="30px">
        <Grid item>
          <InputText
            autoFocus
            name="title"
            label="Title"
            fullWidth
            defaultValue={todo?.title}
            validate={validation([
              isRequired("Title is required field"),
              minLen("Must have 3 chars or more", 3),
            ])}
          />
        </Grid>
        <Grid item>
          <InputDateTime
            name="due_on"
            label="Time"
            fullWidth
            defaultValue={todo?.due_on}
            validate={validation([isRequired("Time is required field")])}
          />
        </Grid>
        <Grid item>
          <InputRadioGroup
            row
            name="status"
            label="Status"
            defaultValue={todo?.status}
            validate={validation([isRequired("Status is required field")])}
            options={statusOptions}
          />
        </Grid>
        <Grid item display="flex" justifyContent="flex-end">
          <ButtonLoading
            type="submit"
            label="Save"
            isLoading={isLoading}
            // disabled={!methods.formState.isValid}
          />
        </Grid>
      </Grid>
    </AppForm>
  );
};

export default TodoForm;
