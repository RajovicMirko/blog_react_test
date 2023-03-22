export const BASE_URL = "users";

export enum UserStatus {
  active = "active",
  inactive = "inactive",
}

export enum Entity {
  posts = "posts",
  todos = "todos",
}

export const USER_ID_KEY = "userId";
export type EntityHttpProps = {
  [USER_ID_KEY]: number | string;
};

export type User = {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: UserStatus;
};
