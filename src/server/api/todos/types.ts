import { BaseRequest, BaseResponse, PaginationParams } from "../../types";

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

export type AllRequest = PaginationParams;
export type AllResponse = BaseResponse<Todo[]>;

export type OneRequest = BaseRequest<{ id?: Todo["id"] }>;
export type OneResponse = BaseResponse<Todo>;

export type OneDataRequest = OneRequest;
export type OneDataResponse = BaseResponse<any>;

export type MutationRequest = Todo;
