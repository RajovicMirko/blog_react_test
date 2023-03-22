export const BASE_URL = "todos";

export enum TodoStatus {
  completed = "completed",
  pending = "pending",
}

export type Todo = {
  id: number;
  user_id: number;
  title: string;
  due_on: string;
  status: TodoStatus;
};
