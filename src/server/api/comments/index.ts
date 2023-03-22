import { generateMany, generateOne } from "src/server/base/generator";
import { Comment } from "./types";

const BASE_URL = "comments";

const useComments = generateMany<Comment[]>(BASE_URL);
const useComment = generateOne<Comment>(BASE_URL);

export type { Comment };
export { useComments, useComment };
