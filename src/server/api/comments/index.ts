import { generateOne } from "src/server/base/apiHooks";
import { Comment } from "./types";

const BASE_URL = "comments";

const comments = {
  one: generateOne<Comment>(BASE_URL),
};

export type { Comment };
export default comments;
