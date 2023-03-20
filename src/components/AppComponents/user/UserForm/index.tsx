import { Grid } from "@mui/material";
import { omitBy } from "lodash";
import { useForm } from "react-hook-form";
import AppForm, {
  TextFieldInput,
  TextFieldSelect,
  TextFieldRadioGroup,
} from "../../../Form";
import ButtonLoading from "../../../Button/ButtonLoading";
import { statusOptions, genderOptions } from "./constants";
import {
  email,
  isRequired,
  minLen,
  validation,
} from "../../../Form/validations";
import { User } from "src/server/api/users";

type UserFormProps = {
  onSubmit: (formData: User) => void;
  isLoading: boolean;
  user?: User;
};

const UserForm = ({ user, onSubmit, isLoading }: UserFormProps) => {
  const methods = useForm<User>({
    mode: "onChange",
    defaultValues: {
      id: user?.id ?? undefined,
      name: user?.name ?? "",
      email: user?.email ?? "",
      gender: user?.gender ?? "",
      status: user?.status,
    },
  });

  const handleOnSubmit = (formData: User) => {
    const payload = omitBy(formData, (value: any) => !value);
    onSubmit(payload as User);
  };

  return (
    <AppForm {...methods} onSubmit={handleOnSubmit} isLoading={isLoading}>
      <Grid container flexDirection="column" rowGap="30px">
        <Grid item>
          <TextFieldInput
            autoFocus
            name="name"
            label="Name"
            fullWidth
            defaultValue={user?.name}
            validate={validation([
              isRequired("Name is required field"),
              minLen("Must have 3 chars or more", 3),
            ])}
          />
        </Grid>
        <Grid item>
          <TextFieldInput
            name="email"
            label="Email"
            fullWidth
            defaultValue={user?.email}
            validate={validation([
              isRequired("Email is required field"),
              email("Email not valid"),
            ])}
          />
        </Grid>
        <Grid item>
          <TextFieldSelect
            name="status"
            label="Status"
            fullWidth
            defaultValue={user?.status ?? ""}
            validate={validation([isRequired("Status is required field")])}
            options={statusOptions}
          />
        </Grid>
        <Grid item>
          <TextFieldRadioGroup
            name="gender"
            label="Gender"
            defaultValue={user?.gender}
            validate={validation([isRequired("Gender is required field")])}
            options={genderOptions}
            row
          />
        </Grid>
        <Grid item display="flex" justifyContent="flex-end">
          <ButtonLoading
            type="submit"
            label="Save"
            isLoading={isLoading}
            disabled={
              !methods.formState.isValid ||
              (!!user && !methods.formState.isDirty)
            }
          />
        </Grid>
      </Grid>
    </AppForm>
  );
};

export default UserForm;
