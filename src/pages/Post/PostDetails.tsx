import { Grid, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ButtonLoading from "src/components/Button/ButtonLoading";
import Card from "src/components/Card";
import Modal from "src/components/Modal";
import ConfirmModal from "src/components/Modal/ConfirmModal";
import useToggle from "src/hooks/useToggle";
import { RoutePath } from "src/router/routesMap";
import posts, { Post } from "src/server/api/posts";
import PostForm from "src/components/AppComponents/post/PostForm";

type PostDetailsProps = {
  post?: Post;
};

const PostDetails = ({ post }: PostDetailsProps) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [isOpenEditModal, toggleEditModal] = useToggle();
  const [isOpenDeleteConfirmation, toggleDeleteConfirmation] = useToggle();

  const { update, isLoadingUpdate, remove, isLoadingRemove, updateQueryData } =
    posts.one({
      id: post?.id,
      options: {
        enabled: !!post?.id,
      },
    });

  const handleSubmitEdit = (formData: Post) => {
    update(formData, {
      onSuccess: (response) => {
        toggleEditModal();
        updateQueryData(response);
        toast.success("Post successfully updated");
      },
    });
  };

  const handleSubmitDeleteUser = () => {
    remove(
      { id: post?.id },
      {
        onSuccess: () => {
          toast.success("Post successfully deleted");
          navigate(RoutePath.users);
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

      <Modal title="Edit Post" open={isOpenEditModal} onClose={toggleEditModal}>
        <PostForm
          post={post}
          onSubmit={handleSubmitEdit}
          isLoading={isLoadingUpdate}
        />
      </Modal>

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
