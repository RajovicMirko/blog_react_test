import { generateMany, generateOne } from "src/server/base/apiHooks";
import { Comment } from "./types";

const BASE_URL = "comments";

const comments = {
  many: generateMany<Comment[]>(BASE_URL),
  one: generateOne<Comment>(BASE_URL),
};

export type { Comment };
export default comments;
