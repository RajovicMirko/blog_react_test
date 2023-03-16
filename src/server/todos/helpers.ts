import { TodoStatus } from "./types";

export const getTodoColorByStatus = (status: TodoStatus) => {
  switch (status) {
    case TodoStatus.completed:
      return "success.main";
    case TodoStatus.pending:
      return "warning.main";
    default:
      return "error";
  }
};
