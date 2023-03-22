import { generateMany, generateOne } from "src/server/base/generator";
import { generateUrlParamPattern } from "src/server/base/helpers";
import { Post } from "../posts";
import { Todo } from "../todos";
import { getUserColorByStatus } from "./helpers";
import {
  BASE_URL,
  Entity,
  EntityHttpProps,
  EntityHttpPropsKeys,
  User,
  UserStatus,
} from "./types";

const userIdPattern = generateUrlParamPattern(EntityHttpPropsKeys.userId);

const useUsers = generateMany<User[]>(BASE_URL);

const useUser = generateOne<User>(BASE_URL);

const useUserPosts = generateMany<Post[], EntityHttpProps>(
  `${BASE_URL}/${userIdPattern}/${Entity.posts}`
);

const useUserTodos = generateMany<Todo[], EntityHttpProps>(
  `${BASE_URL}/${userIdPattern}/${Entity.todos}`
);

export type { User };
export { Entity as UserEntity, UserStatus, getUserColorByStatus };
export { useUsers, useUser, useUserPosts, useUserTodos };
