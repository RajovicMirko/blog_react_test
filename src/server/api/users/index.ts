import {
  generateMany,
  generateOne,
  generateOneEntity,
} from "src/server/base/apiHooks";
import { Post } from "../posts";
import { Todo } from "../todos";
import { User, Entity, UserStatus } from "./types";
import { getUserColorByStatus } from "./helpers";

const BASE_URL = "users";

const users = {
  many: generateMany<User[]>(BASE_URL),
  one: generateOne<User>(BASE_URL),
  oneEntity: generateOneEntity<(Post & Todo)[], Entity>(BASE_URL),
};

export type { User };
export { Entity as UserEntity, UserStatus, getUserColorByStatus };
export default users;
