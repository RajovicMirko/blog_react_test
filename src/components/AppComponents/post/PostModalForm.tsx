import Modal, { ModalProps } from "src/components/Modal";
import useToggle from "src/hooks/useToggle";
import { Post } from "src/server/api/posts";
import PostForm, { PostFormProps } from "./PostForm";

type PostModalFormProps = ModalProps & Partial<PostFormProps>;

const PostModalForm = ({
  open,
  onClose,
  post,
  userId,
  onSuccess,
}: PostModalFormProps) => {
  const [isPersistent, _, manualToggleIsPersistent] = useToggle();

  const handleIsPersistentOn = () => manualToggleIsPersistent(true);
  const handleIsPersistentOff = () => manualToggleIsPersistent(false);

  const title = `${post ? "Edit" : "Create"} Post`;

  const handleUserFormSuccess = (formData: Post) => {
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
      <PostForm
        post={post}
        userId={userId}
        onSuccess={handleUserFormSuccess}
        onPreSubmit={handleIsPersistentOn}
        onPostSubmit={handleIsPersistentOff}
      />
    </Modal>
  );
};

export default PostModalForm;
