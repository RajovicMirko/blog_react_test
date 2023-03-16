import { Post } from "../posts";
import { BaseRequest, BaseResponse } from "../types";

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

export type OneProps = BaseRequest<{
  id?: User["id"];
}>;

export type OneDataProps = BaseRequest<
  OneProps & {
    entity: Entity;
  }
>;

export type AllResponse = BaseResponse<User[]>;
export type HttpAllResponse = Promise<AllResponse>;

export type OneResponse = BaseResponse<User>;
export type HttpOneResponse = Promise<OneResponse>;

export type OneDataResponse = BaseResponse<Post | any>;
export type HttpOneDataResponse = Promise<OneDataResponse>;
