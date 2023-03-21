import { Grid, Typography, useTheme } from "@mui/material";

import comments, { Comment } from "src/server/api/comments";

import Card from "../../Card";
import useToggle from "../../../hooks/useToggle";
import ButtonLoading from "../../Button/ButtonLoading";
import ConfirmModal from "../../Modal/ConfirmModal";
import Modal from "src/components/Modal";
import CommentForm from "./CommentForm";
import { toast } from "react-toastify";

type CommentCardProps = {
  comment: Comment;
  onEditSuccess: (id: Comment["id"]) => void;
  onDeleteSuccess: (id: Comment["id"]) => void;
  isLoadingDelete?: boolean;
  isLoading?: boolean;
};

const CommentCard = ({
  comment,
  isLoading,
  onEditSuccess,
  onDeleteSuccess,
}: CommentCardProps) => {
  const theme = useTheme();
  const [isCommentModalOpen, toggleEditCommentModal] = useToggle();
  const [isConfirmDeleteOpen, toggleDeleteConfirmation] = useToggle();

  const { update, isLoadingUpdate, remove, isLoadingRemove } = comments.one({});

  const handleEditModal = (formData: Comment) => {
    update(formData, {
      onSuccess: () => {
        onEditSuccess(comment?.id);
        toggleEditCommentModal();
        toast.success("Comment is updated");
      },
    });
  };

  const handleRemoveComment = () => {
    remove(
      { id: comment?.id },
      {
        onSuccess: () => {
          toggleDeleteConfirmation();
          onDeleteSuccess(comment.id);
        },
      }
    );
  };

  return (
    <Card isLoading={isLoading} sx={{ minHeight: "150px" }}>
      <Grid container rowGap="10px">
        <Card.Title title={comment.name} sx={theme.mixins.textEllipsis} />

        <Grid container rowGap="14px">
          <Typography variant="body1">{comment.email}</Typography>
        </Grid>
        <Grid container rowGap="14px">
          <Typography variant="body1">{comment.body}</Typography>
        </Grid>
      </Grid>

      {!!onDeleteSuccess && (
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
      )}

      <Modal
        title="Edit comment"
        open={isCommentModalOpen}
        onClose={toggleEditCommentModal}
        persistent={isLoadingUpdate}
      >
        <CommentForm
          comment={comment}
          postId={comment?.post_id}
          onSubmit={handleEditModal}
          isLoading={isLoadingUpdate}
        />
      </Modal>

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
