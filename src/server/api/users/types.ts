import { generateUrlParamPattern } from "src/server/base/helpers";

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

export const BASE_URL = "users";

const userIdPattern = generateUrlParamPattern(EntityHttpPropsKeys.userId);

export const usersHttpUrls = {
  useUsers: BASE_URL,
  useUser: BASE_URL,
  useUserPosts: `${BASE_URL}/${userIdPattern}/${Entity.posts}`,
  useUserTodos: `${BASE_URL}/${userIdPattern}/${Entity.todos}`,
};
