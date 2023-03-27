import { Grid } from "@mui/material";
import { omitBy } from "lodash";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  updaterFunctionCreate,
  updaterFunctionUpdate,
} from "src/server/api/helpers";
import { Post, usePost } from "src/server/api/posts";
import { User } from "src/server/api/users";
import { usersHttpUrls } from "src/server/api/users/types";
import ButtonLoading from "../../../Button/ButtonLoading";
import { InputText } from "../../../Form";
import AppForm from "../../../Form/AppForm";
import { isRequired, minLen, validation } from "../../../Form/validations";

export type PostFormProps = {
  onSuccess: (formData: Post) => void;
  onPreSubmit?: () => void;
  onPostSubmit?: () => void;
  userId?: User["id"];
  post?: Post;
};

const PostForm = ({
  post,
  userId,
  onSuccess,
  onPreSubmit,
  onPostSubmit,
}: PostFormProps) => {
  const {
    create,
    isLoadingCreate,
    update,
    isLoadingUpdate,
    updateOne,
    updateMany,
  } = usePost();

  const isLoading = isLoadingCreate || isLoadingUpdate;

  const methods = useForm<Post>({
    mode: "onChange",
    defaultValues: {
      user_id: userId,
      id: post?.id,
      title: post?.title ?? "",
      body: post?.body ?? "",
    },
  });

  const handleEdit = (formData: Post) => {
    update(formData, {
      onSuccess: (response) => {
        updateOne(response, post?.id as number);
        updateMany(
          usersHttpUrls.useUserPosts,
          updaterFunctionUpdate<Post>(response)
        );
        onSuccess(formData);
        toast.success("Post successfully updated");
      },
      onSettled: () => onPostSubmit?.(),
    });
  };

  const handleCreate = (formData: Post) => {
    create(formData, {
      onSuccess: (response) => {
        updateMany(
          usersHttpUrls.useUserPosts,
          updaterFunctionCreate<Post>(response)
        );
        onSuccess(formData);
        toast.success("Post successfully added");
      },
      onSettled: () => onPostSubmit?.(),
    });
  };

  const handleOnSubmit = (formData: Post) => {
    onPreSubmit?.();
    const payload = omitBy(formData, (value: any) => !value) as Post;
    const fn = post?.id ? handleEdit : handleCreate;

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
            defaultValue={post?.title}
            validate={validation([
              isRequired("Name is required field"),
              minLen("Must have 3 chars or more", 3),
            ])}
          />
        </Grid>
        <Grid item>
          <InputText
            name="body"
            label="Description"
            fullWidth
            defaultValue={post?.body}
            validate={validation([
              isRequired("Name is required field"),
              minLen("Must have 5 chars or more", 5),
            ])}
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

export default PostForm;
