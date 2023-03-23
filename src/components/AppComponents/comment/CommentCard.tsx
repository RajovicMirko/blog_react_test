import { Grid, Typography, useTheme } from "@mui/material";
import { toast } from "react-toastify";

import { Comment, useComment } from "src/server/api/comments";
import { updaterFunctionRemove } from "src/server/api/helpers";
import { postsHttpUrls } from "src/server/api/posts/types";

import useToggle from "../../../hooks/useToggle";
import ButtonLoading from "../../Button/ButtonLoading";
import Card from "../../Card";
import ConfirmModal from "../../Modal/ConfirmModal";
import CommentModalForm from "./CommentModalForm";

type CommentCardProps = {
  comment: Comment;
};

const CommentCard = ({ comment }: CommentCardProps) => {
  const theme = useTheme();
  const [isCommentModalOpen, toggleEditCommentModal] = useToggle();
  const [isConfirmDeleteOpen, toggleDeleteConfirmation] = useToggle();

  const { remove, isLoadingRemove, updateMany } = useComment({});

  const handleRemoveComment = () => {
    remove(
      { id: comment?.id },
      {
        onSuccess: () => {
          updateMany(
            postsHttpUrls.usePostComments,
            updaterFunctionRemove<Comment>(comment?.id as number)
          );
          toggleDeleteConfirmation();
          toast.success("Comment successfully deleted");
        },
      }
    );
  };

  return (
    <Card sx={{ minHeight: "150px" }}>
      <Grid container rowGap="10px">
        <Card.Title title={comment.name} sx={theme.mixins.textEllipsis} />

        <Grid container rowGap="14px">
          <Typography variant="body1">{comment.email}</Typography>
        </Grid>
        <Grid container rowGap="14px">
          <Typography variant="body1">{comment.body}</Typography>
        </Grid>
      </Grid>

      <Card.Actions>
        <ButtonLoading
          label="Edit"
          color="info"
          onClick={toggleEditCommentModal}
        />
        <ButtonLoading
          label="Delete"
          color="error"
          onClick={toggleDeleteConfirmation}
        />
      </Card.Actions>

      <CommentModalForm
        comment={comment}
        postId={comment?.post_id}
        open={isCommentModalOpen}
        onClose={toggleEditCommentModal}
      />

      <ConfirmModal
        title="Delete Comment"
        description={`You are about to delete comment`}
        open={isConfirmDeleteOpen}
        onClose={toggleDeleteConfirmation}
        okText="Yes, delete comment"
        onOk={handleRemoveComment}
        isLoading={isLoadingRemove}
      />
    </Card>
  );
};

export default CommentCard;
