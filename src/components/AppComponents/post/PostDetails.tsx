import { Grid, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PostModalForm from "src/components/AppComponents/post/PostModalForm";
import ButtonLoading from "src/components/Button/ButtonLoading";
import Card from "src/components/Card";
import ConfirmModal from "src/components/Modal/ConfirmModal";
import useToggle from "src/hooks/useToggle";
import { RoutePath } from "src/router/routesMap";
import { updaterFunctionRemove } from "src/server/api/helpers";
import { Post, usePost } from "src/server/api/posts";
import { usersHttpUrls } from "src/server/api/users/types";

type PostDetailsProps = {
  post?: Post;
};

const PostDetails = ({ post }: PostDetailsProps) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [isOpenEditModal, toggleEditModal] = useToggle();
  const [isOpenDeleteConfirmation, toggleDeleteConfirmation] = useToggle();

  const { remove, isLoadingRemove, updateMany } = usePost({
    id: post?.id,
    options: {
      enabled: !!post?.id,
    },
  });

  const handleSubmitDeleteUser = () => {
    remove(
      { id: post?.id },
      {
        onSuccess: () => {
          toast.success("Post successfully deleted");
          updateMany(
            usersHttpUrls.useUserPosts,
            updaterFunctionRemove<Post>(post?.id as number)
          );
          navigate(RoutePath.user, { state: { id: post?.user_id } });
        },
      }
    );
  };

  if (!post?.id) return null;

  return (
    <Grid container padding="30px 40px">
      <Grid container item xs={12} md={6}>
        <Grid item flex={1}>
          <Typography variant="h4" mb="30px" sx={theme.mixins.textEllipsis}>
            ({post?.id}) {post?.title}
          </Typography>

          <Grid maxWidth={500}>
            <Card.Description inline label="Description">
              {post?.body}
            </Card.Description>
          </Grid>
        </Grid>
      </Grid>

      <Grid
        container
        item
        spacing={3}
        xs={12}
        md={6}
        justifyContent="flex-end"
        alignItems="flex-end"
      >
        <Grid item xs={12} md={3}>
          <ButtonLoading
            fullWidth
            variant="contained"
            label="Edit"
            color="info"
            onClick={toggleEditModal}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <ButtonLoading
            fullWidth
            variant="outlined"
            label="Delete"
            color="error"
            onClick={toggleDeleteConfirmation}
          />
        </Grid>
      </Grid>

      <PostModalForm
        post={post}
        userId={post.user_id}
        open={isOpenEditModal}
        onClose={toggleEditModal}
      />

      <ConfirmModal
        title="Delete Post"
        description={`You are about to delete post`}
        open={isOpenDeleteConfirmation}
        onClose={toggleDeleteConfirmation}
        okText="Yes, delete Post"
        onOk={handleSubmitDeleteUser}
        isLoading={isLoadingRemove}
      />
    </Grid>
  );
};

export default PostDetails;
