import { generateMany, generateOne } from "src/server/base/generator";
import { Post } from "../posts";
import { Todo } from "../todos";
import { getUserColorByStatus } from "./helpers";
import {
  Entity,
  EntityHttpProps,
  User,
  usersHttpUrls,
  UserStatus,
} from "./types";

const useUsers = generateMany<User[]>(usersHttpUrls.useUsers);

const useUser = generateOne<User>(usersHttpUrls.useUsers);

const useUserPosts = generateMany<Post[], EntityHttpProps>(
  usersHttpUrls.useUserPosts
);

const useUserTodos = generateMany<Todo[], EntityHttpProps>(
  usersHttpUrls.useUserTodos
);

export type { User };
export { Entity as UserEntity, UserStatus, getUserColorByStatus };
export { useUsers, useUser, useUserPosts, useUserTodos };
