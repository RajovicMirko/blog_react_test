import { generateMany, generateOne } from "src/server/base/generator";
import { generateUrlParamPattern } from "src/server/base/helpers";
import { Comment } from "../comments";
import { BASE_URL, Entity, EntityHttpProps, Post, POST_ID_KEY } from "./types";

const usePosts = generateMany<Post[]>(BASE_URL);

const usePost = generateOne<Post>(BASE_URL);

const usePostComments = generateMany<Comment[], EntityHttpProps>(
  `${BASE_URL}/${generateUrlParamPattern(POST_ID_KEY)}/${Entity.comments}`
);

export type { Post };
export { Entity as PostEntity };
export { usePosts, usePost, usePostComments };
