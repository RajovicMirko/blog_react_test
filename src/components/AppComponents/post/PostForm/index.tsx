import { Grid } from "@mui/material";
import { omitBy } from "lodash";
import { useForm } from "react-hook-form";
import { User } from "src/server/api/users";
import AppForm from "../../../Form/AppForm";
import ButtonLoading from "../../../Button/ButtonLoading";
import TextFieldInput from "../../../Form/components/TextFieldInput";
import { isRequired, minLen, validation } from "../../../Form/validations";
import { Post } from "../../../../server/api/posts";

type PostFormProps = {
  onSubmit: (formData: Post) => void;
  isLoading: boolean;
  userId?: User["id"];
  post?: Post;
};

const PostForm = ({ post, userId, onSubmit, isLoading }: PostFormProps) => {
  const methods = useForm<Post>({
    mode: "onChange",
    defaultValues: {
      user_id: userId,
      id: post?.id,
      title: post?.title ?? "",
      body: post?.body ?? "",
    },
  });

  const handleOnSubmit = (formData: Post) => {
    const payload = omitBy(formData, (value: any) => !value);
    onSubmit(payload as Post);
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
            defaultValue={post?.title}
            validate={validation([
              isRequired("Name is required field"),
              minLen("Must have 3 chars or more", 3),
            ])}
          />
        </Grid>
        <Grid item>
          <TextFieldInput
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
