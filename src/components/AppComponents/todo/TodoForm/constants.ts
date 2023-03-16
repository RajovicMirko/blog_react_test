import { TodoStatus } from "../../../../server/todos/types";

export const statusOptions = [
  { id: TodoStatus.completed, label: "Completed" },
  { id: TodoStatus.pending, label: "Pending" },
];
