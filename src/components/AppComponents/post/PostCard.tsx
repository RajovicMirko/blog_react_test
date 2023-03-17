import { Grid, Typography, useTheme } from "@mui/material";
import Card from "../../Card";
import useToggle from "../../../hooks/useToggle";
import posts, { Post } from "../../../server/api/posts";
import ButtonLoading from "../../Button/ButtonLoading";
import ConfirmModal from "../../Modal/ConfirmModal";

type PostCardProps = {
  post: Post;
  onDeleteSuccess: (id: Post["id"]) => void;
  isLoadingDelete?: boolean;
  isLoading?: boolean;
};

const PostCard = ({ post, isLoading, onDeleteSuccess }: PostCardProps) => {
  const theme = useTheme();
  const [isConfirmDeleteOpen, toggleDeleteConfirmation] = useToggle();

  const { remove, isLoadingRemove } = posts.one({});

  const handleRemovePost = () => {
    remove(
      { id: post?.id },
      {
        onSuccess: () => {
          toggleDeleteConfirmation();
          onDeleteSuccess(post.id);
        },
      }
    );
  };

  return (
    <Card isLoading={isLoading} sx={{ minHeight: "250px" }}>
      <Grid container rowGap="10px">
        <Card.Title title={post.title} sx={theme.mixins.textEllipsis} />

        <Grid container rowGap="14px">
          <Typography variant="body1">{post.body}</Typography>
        </Grid>
      </Grid>

      {!!onDeleteSuccess && (
        <Card.Actions>
          <ButtonLoading
            label="Delete"
            color="error"
            onClick={toggleDeleteConfirmation}
          />
        </Card.Actions>
      )}

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
