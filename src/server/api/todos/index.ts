import { generateOne } from "src/server/base/apiHooks";
import { Todo, TodoStatus } from "./types";
import { getTodoColorByStatus } from "./helpers";

const BASE_URL = "todos";

const todos = {
  one: generateOne<Todo>(BASE_URL),
};

export type { Todo };
export { TodoStatus, getTodoColorByStatus };
export default todos;
