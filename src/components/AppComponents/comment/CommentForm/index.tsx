import { Grid } from "@mui/material";
import { omitBy } from "lodash";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Comment, useComment } from "src/server/api/comments";
import {
  updaterFunctionCreate,
  updaterFunctionUpdate,
} from "src/server/api/helpers";
import { Post } from "src/server/api/posts";
import { postsHttpUrls } from "src/server/api/posts/types";
import ButtonLoading from "../../../Button/ButtonLoading";
import AppForm from "../../../Form/AppForm";
import TextFieldInput from "../../../Form/components/TextFieldInput";
import {
  email,
  isRequired,
  minLen,
  validation,
} from "../../../Form/validations";

export type CommentFormProps = {
  onSuccess: (formData: Comment) => void;
  onPreSubmit?: () => void;
  onPostSubmit?: () => void;
  postId?: Post["id"];
  comment?: Comment;
};

const CommentForm = ({
  comment,
  postId,
  onSuccess,
  onPreSubmit,
  onPostSubmit,
}: CommentFormProps) => {
  const {
    create,
    isLoadingCreate,
    update,
    isLoadingUpdate,
    updateOne,
    updateMany,
  } = useComment();

  const isLoading = isLoadingCreate || isLoadingUpdate;

  const methods = useForm<Comment>({
    mode: "onChange",
    defaultValues: {
      post_id: postId,
      id: comment?.id,
      name: comment?.name ?? "",
      email: comment?.email ?? "",
      body: comment?.body ?? "",
    },
  });
  const handleCreate = (commentData: Comment) => {
    create(commentData, {
      onSuccess: (response) => {
        updateOne(response, response?.data?.data?.id as number);
        updateMany(
          postsHttpUrls.usePostComments,
          updaterFunctionCreate<Comment>(response)
        );
        toast.success("Todo successfully added");
        onSuccess?.(commentData);
      },
      onSettled: () => onPostSubmit?.(),
    });
  };

  const handleEdit = (commentData: Comment) => {
    update(commentData, {
      onSuccess: (response) => {
        updateOne(response, comment?.id as number);
        updateMany(
          postsHttpUrls.usePostComments,
          updaterFunctionUpdate<Comment>(response)
        );
        toast.success("User successfully updated");
        onSuccess?.(commentData);
      },
      onSettled: () => onPostSubmit?.(),
    });
  };

  const handleOnSubmit = (formData: Comment) => {
    onPreSubmit?.();
    const payload = omitBy(formData, (value: any) => !value) as Comment;
    const fn = comment?.id ? handleEdit : handleCreate;

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
            defaultValue={comment?.name}
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
            defaultValue={comment?.email}
            validate={validation([
              isRequired("Email is required field"),
              email("Email not valid format"),
            ])}
          />
        </Grid>
        <Grid item>
          <TextFieldInput
            name="body"
            label="Description"
            fullWidth
            defaultValue={comment?.body}
            validate={validation([
              isRequired("Description is required field"),
              minLen("Must have 3 chars or more", 3),
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

export default CommentForm;
