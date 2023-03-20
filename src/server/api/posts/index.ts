import { generateOne, generateOneEntity } from "src/server/base/apiHooks";
import { Comment } from "../comments";
import { Entity, Post } from "./types";

const BASE_URL = "posts";

const posts = {
  one: generateOne<Post>(BASE_URL),
  oneEntity: generateOneEntity<Comment[], Entity>(BASE_URL),
};

export type { Post };
export { Entity as PostEntity };
export default posts;
