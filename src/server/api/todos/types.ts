import { BaseRequest, BaseResponse } from "../../types";

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

export type OneProps = BaseRequest<{
  id?: Todo["id"];
}>;

export type OneDataProps = BaseRequest<
  OneProps & {
    entity: TodoStatus;
  }
>;

export type AllResponse = BaseResponse<Todo[]>;
export type HttpAllResponse = Promise<AllResponse>;

export type OneResponse = BaseResponse<Todo>;
export type HttpOneResponse = Promise<OneResponse>;

export type OneDataResponse = BaseResponse<any>;
export type HttpOneDataResponse = Promise<OneDataResponse>;
