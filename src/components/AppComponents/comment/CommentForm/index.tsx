import { Grid } from "@mui/material";
import { omitBy } from "lodash";
import { useForm } from "react-hook-form";
import AppForm from "../../../Form/AppForm";
import ButtonLoading from "../../../Button/ButtonLoading";
import TextFieldInput from "../../../Form/components/TextFieldInput";
import {
  email,
  isRequired,
  minLen,
  validation,
} from "../../../Form/validations";
import { Post } from "src/server/api/posts";
import { Comment } from "src/server/api/comments";

type CommentFormProps = {
  onSubmit: (formData: Comment) => void;
  isLoading: boolean;
  postId?: Post["id"];
  comment?: Comment;
};

const CommentForm = ({
  comment,
  postId,
  onSubmit,
  isLoading,
}: CommentFormProps) => {
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

  const handleOnSubmit = (formData: Comment) => {
    const payload = omitBy(formData, (value: any) => !value);
    onSubmit(payload as Comment);
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
