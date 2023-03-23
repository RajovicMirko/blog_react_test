import Modal, { ModalProps } from "src/components/Modal";
import useToggle from "src/hooks/useToggle";
import { Comment } from "src/server/api/comments";
import CommentForm, { CommentFormProps } from "./CommentForm";

type CommentModalFormProps = ModalProps & Partial<CommentFormProps>;

const CommentModalForm = ({
  open,
  onClose,
  comment,
  postId,
  onSuccess,
}: CommentModalFormProps) => {
  const [isPersistent, _, manualToggleIsPersistent] = useToggle(false);

  const handleIsPersistentOn = () => manualToggleIsPersistent(true);
  const handleIsPersistentOff = () => manualToggleIsPersistent(false);

  const title = `${comment ? "Edit" : "Create"} Comment`;

  const handleUserFormSuccess = (formData: Comment) => {
    handleIsPersistentOff();
    onSuccess?.(formData);
    onClose();
  };

  return (
    <Modal
      title={title}
      open={open}
      onClose={onClose}
      persistent={isPersistent}
    >
      <CommentForm
        comment={comment}
        postId={postId}
        onSuccess={handleUserFormSuccess}
        onPreSubmit={handleIsPersistentOn}
        onPostSubmit={handleIsPersistentOff}
      />
    </Modal>
  );
};

export default CommentModalForm;
