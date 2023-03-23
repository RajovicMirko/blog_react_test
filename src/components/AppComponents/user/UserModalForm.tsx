import Modal, { ModalProps } from "src/components/Modal";
import useToggle from "src/hooks/useToggle";
import { User } from "src/server/api/users";
import UserForm, { UserFormProps } from "./UserForm";

type UserModalFormProps = ModalProps & Partial<UserFormProps>;

const UserModalForm = ({
  open,
  onClose,
  user,
  onSuccess,
}: UserModalFormProps) => {
  const [isPersistent, _, manualToggleIsPersistent] = useToggle(false);

  const handleIsPersistentOn = () => manualToggleIsPersistent(true);
  const handleIsPersistentOff = () => manualToggleIsPersistent(false);

  const title = `${user ? "Edit" : "Create"} User`;

  const handleUserFormSuccess = (formData: User) => {
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
      <UserForm
        user={user}
        onSuccess={handleUserFormSuccess}
        onPreSubmit={handleIsPersistentOn}
        onPostSubmit={handleIsPersistentOff}
      />
    </Modal>
  );
};

export default UserModalForm;
