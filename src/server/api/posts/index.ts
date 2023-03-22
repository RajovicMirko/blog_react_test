import { generateMany, generateOne } from "src/server/base/generator";
import { generateUrlParamPattern } from "src/server/base/helpers";
import { Comment } from "../comments";
import {
  BASE_URL,
  Entity,
  EntityHttpProps,
  EntityHttpPropsKeys,
  Post,
} from "./types";

const postIdPattern = generateUrlParamPattern(EntityHttpPropsKeys.postId);

const usePosts = generateMany<Post[]>(BASE_URL);

const usePost = generateOne<Post>(BASE_URL);

const usePostComments = generateMany<Comment[], EntityHttpProps>(
  `${BASE_URL}/${postIdPattern}/${Entity.comments}`
);

export type { Post };
export { Entity as PostEntity };
export { usePosts, usePost, usePostComments };
