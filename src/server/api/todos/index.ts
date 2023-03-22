import { generateOne } from "src/server/base/generator";
import { getTodoColorByStatus } from "./helpers";
import { BASE_URL, Todo, TodoStatus } from "./types";

const useTodo = generateOne<Todo>(BASE_URL);

export type { Todo };
export { TodoStatus, getTodoColorByStatus };
export { useTodo };
