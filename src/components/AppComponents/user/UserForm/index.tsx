import { Grid } from "@mui/material";
import { omitBy } from "lodash";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RoutePath } from "src/router/routesMap";
import {
  updaterFunctionCreate,
  updaterFunctionUpdate,
} from "src/server/api/helpers";
import { User, useUser } from "src/server/api/users";
import { usersHttpUrls } from "src/server/api/users/types";
import ButtonLoading from "../../../Button/ButtonLoading";
import AppForm, {
  TextFieldInput,
  TextFieldRadioGroup,
  TextFieldSelect,
} from "../../../Form";
import {
  email,
  isRequired,
  minLen,
  validation,
} from "../../../Form/validations";
import { genderOptions, statusOptions } from "./constants";

export type UserFormProps = {
  onSuccess: (formData: User) => void;
  onPreSubmit?: () => void;
  onPostSubmit?: () => void;
  user?: User;
};

const UserForm = ({
  user,
  onSuccess,
  onPreSubmit,
  onPostSubmit,
}: UserFormProps) => {
  const navigate = useNavigate();
  const {
    create,
    isLoadingCreate,
    update,
    isLoadingUpdate,
    updateOne,
    updateMany,
  } = useUser();

  const isLoading = isLoadingCreate || isLoadingUpdate;

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

  const handleCreate = (userData: User) => {
    create(userData, {
      onSuccess: (response) => {
        updateOne(response, response?.data?.data?.id as number);
        updateMany(
          usersHttpUrls.useUsers,
          updaterFunctionCreate<User>(response)
        );
        toast.success("User successfully added");
        onSuccess(userData);
        navigate(RoutePath.user, { state: { id: response.data.data.id } });
      },
      onSettled: () => onPostSubmit?.(),
    });
  };

  const handleEdit = (userData: User) => {
    update(userData, {
      onSuccess: (response) => {
        updateOne(response, user?.id as number);
        updateMany(
          usersHttpUrls.useUsers,
          updaterFunctionUpdate<User>(response)
        );
        toast.success("User successfully updated");
        onSuccess(userData);
      },
      onSettled: () => onPostSubmit?.(),
    });
  };

  const handleOnSubmit = (formData: User) => {
    onPreSubmit?.();
    const payload = omitBy(formData, (value: any) => !value) as User;
    const fn = user?.id ? handleEdit : handleCreate;

    fn(payload);
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
