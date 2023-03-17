import { Post } from "../posts";
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

export type AllRequest = PaginationParams;
export type AllResponse = BaseResponse<User[]>;

export type OneRequest = BaseRequest<{ id?: User["id"] }>;
export type OneResponse = BaseResponse<User>;

export type OneDataRequest = OneRequest & { entity: Entity };
export type OneDataResponse = BaseResponse<Post | any>;

export type MutationRequest = User;
