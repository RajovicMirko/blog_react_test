import { generateOne, generateOneEntity } from "src/server/base/apiHooks";
import { Entity, Post } from "./types";

const BASE_URL = "posts";

const posts = {
  one: generateOne<Post>(BASE_URL),
  oneEntity: generateOneEntity<any[], Entity>(BASE_URL),
};

export type { Post };
export { Entity as PostEntity };
export default posts;
