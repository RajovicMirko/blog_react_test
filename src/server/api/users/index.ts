import { generateMany, generateOne } from "src/server/base/generator";
import { generateUrlParamPattern } from "src/server/base/helpers";
import { Post } from "../posts";
import { Todo } from "../todos";
import { getUserColorByStatus } from "./helpers";
import {
  BASE_URL,
  Entity,
  EntityHttpProps,
  User,
  UserStatus,
  USER_ID_KEY,
} from "./types";

const useUsers = generateMany<User[]>(BASE_URL);

const useUser = generateOne<User>(BASE_URL);

const useUserPosts = generateMany<Post[], EntityHttpProps>(
  `${BASE_URL}/${generateUrlParamPattern(USER_ID_KEY)}/${Entity.posts}`
);

const useUserTodos = generateMany<Todo[], EntityHttpProps>(
  `${BASE_URL}/${generateUrlParamPattern(USER_ID_KEY)}/${Entity.todos}`
);

export type { User };
export { Entity as UserEntity, UserStatus, getUserColorByStatus };
export { useUsers, useUser, useUserPosts, useUserTodos };
