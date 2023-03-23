import { Grid, Typography, useTheme } from "@mui/material";

import { Post, usePost } from "src/server/api/posts";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RoutePath } from "src/router/routesMap";
import { updaterFunctionRemove } from "src/server/api/helpers";
import { usersHttpUrls } from "src/server/api/users/types";
import useToggle from "../../../hooks/useToggle";
import ButtonLoading from "../../Button/ButtonLoading";
import Card from "../../Card";
import ConfirmModal from "../../Modal/ConfirmModal";

type PostCardProps = {
  post: Post;
};

const PostCard = ({ post }: PostCardProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [isConfirmDeleteOpen, toggleDeleteConfirmation] = useToggle();

  const { remove, isLoadingRemove, updateMany } = usePost({});

  const handleDetailsClick = () =>
    navigate(RoutePath.post, {
      state: {
        id: post.id,
      },
    });

  const handleRemovePost = () => {
    remove(
      { id: post?.id },
      {
        onSuccess: () => {
          updateMany(
            usersHttpUrls.useUserPosts,
            updaterFunctionRemove<Post>(post?.id as number)
          );

          toggleDeleteConfirmation();
          toast.success("Post successfully deleted");
        },
      }
    );
  };

  return (
    <Card sx={{ minHeight: "250px" }}>
      <Grid container rowGap="10px">
        <Card.Title title={post.title} sx={theme.mixins.textEllipsis} />

        <Grid container rowGap="14px">
          <Typography variant="body1">{post.body}</Typography>
        </Grid>
      </Grid>

      <Card.Actions>
        <ButtonLoading
          label="Details"
          color="info"
          onClick={handleDetailsClick}
        />
        <ButtonLoading
          label="Delete"
          color="error"
          onClick={toggleDeleteConfirmation}
        />
      </Card.Actions>

      <ConfirmModal
        title="Delete Post"
        description={`You are about to delete post`}
        open={isConfirmDeleteOpen}
        onClose={toggleDeleteConfirmation}
        okText="Yes, delete post"
        onOk={handleRemovePost}
        isLoading={isLoadingRemove}
      />
    </Card>
  );
};

export default PostCard;
