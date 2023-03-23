import Modal, { ModalProps } from "src/components/Modal";
import useToggle from "src/hooks/useToggle";
import { Todo } from "src/server/api/todos";
import TodoForm, { TodoFormProps } from "./TodoForm";

type TodoModalFormProps = ModalProps & Partial<TodoFormProps>;

const TodoModalForm = ({
  open,
  onClose,
  todo,
  userId,
  onSuccess,
}: TodoModalFormProps) => {
  const [isPersistent, _, manualToggleIsPersistent] = useToggle(false);

  const handleIsPersistentOn = () => manualToggleIsPersistent(true);
  const handleIsPersistentOff = () => manualToggleIsPersistent(false);

  const title = `${todo ? "Edit" : "Create"} Todo`;

  const handleUserFormSuccess = (formData: Todo) => {
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
      <TodoForm
        todo={todo}
        userId={userId}
        onSuccess={handleUserFormSuccess}
        onPreSubmit={handleIsPersistentOn}
        onPostSubmit={handleIsPersistentOff}
      />
    </Modal>
  );
};

export default TodoModalForm;
