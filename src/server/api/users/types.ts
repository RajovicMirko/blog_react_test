export const BASE_URL = "users";

export enum UserStatus {
  active = "active",
  inactive = "inactive",
}

export enum Entity {
  posts = "posts",
  todos = "todos",
}

export enum EntityHttpPropsKeys {
  "userId" = "userId",
}

export type EntityHttpProps = {
  userId: number | string;
};

export type User = {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: UserStatus;
};
