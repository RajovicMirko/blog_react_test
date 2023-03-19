import { Post } from "../posts";
import { Todo } from "../todos";
import { BaseRequest, BaseResponse, PaginationParams } from "../../types";

export const BASE_URL = "users";

export enum UserStatus {
  active = "active",
  inactive = "inactive",
}

export enum Entity {
  posts = "posts",
  todos = "todos",
}

export type User = {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: UserStatus;
};

export type ManyRequest = PaginationParams;
export type ManyResponse = BaseResponse<User[]>;

export type OneRequest = BaseRequest<{ id?: User["id"] }>;
export type OneResponse = BaseResponse<User>;

export type EntityRequest = OneRequest & { entity: Entity };
export type EntityResponse = BaseResponse<Post[] & Todo[]>;

export type MutationRequest = User;
