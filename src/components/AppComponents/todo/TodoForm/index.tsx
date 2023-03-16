import { Grid } from "@mui/material";
import { omitBy } from "lodash";
import { useForm } from "react-hook-form";
import { User } from "../../../../server/users";
import AppForm, { TextFieldInput, TextFieldRadioGroup } from "../../../Form";
import ButtonLoading from "../../../Button/ButtonLoading";
import { isRequired, minLen, validation } from "../../../Form/validations";
import { Todo } from "../../../../server/todos";
import { statusOptions } from "./constants";

type TodoFormProps = {
  onSubmit: (formData: Todo) => void;
  isLoading: boolean;
  userId?: User["id"];
  todo?: Todo;
};

const TodoForm = ({ todo, userId, onSubmit, isLoading }: TodoFormProps) => {
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

  const handleOnSubmit = (formData: Todo) => {
    const payload = omitBy(formData, (value: any) => !value);
    onSubmit(payload as Todo);
  };

  return (
    <AppForm {...methods} onSubmit={handleOnSubmit} isLoading={isLoading}>
      <Grid container flexDirection="column" rowGap="30px">
        <Grid item>
          <TextFieldInput
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
          <TextFieldInput
            name="due_on"
            label="Time"
            fullWidth
            defaultValue={todo?.due_on}
            // validate={validation([isRequired("Time is required field")])}
          />
          <TextFieldRadioGroup
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
            disabled={!methods.formState.isValid}
          />
        </Grid>
      </Grid>
    </AppForm>
  );
};

export default TodoForm;
