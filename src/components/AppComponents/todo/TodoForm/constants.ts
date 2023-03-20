import { TodoStatus } from "src/server/api/todos";

export const statusOptions = [
  { id: TodoStatus.completed, label: "Completed" },
  { id: TodoStatus.pending, label: "Pending" },
];
