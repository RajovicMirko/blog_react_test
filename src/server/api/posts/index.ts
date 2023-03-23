import { generateMany, generateOne } from "src/server/base/generator";
import { Comment } from "../comments";
import { Entity, EntityHttpProps, Post, postsHttpUrls } from "./types";

const usePosts = generateMany<Post[]>(postsHttpUrls.usePosts);

const usePost = generateOne<Post>(postsHttpUrls.usePost);

const usePostComments = generateMany<Comment[], EntityHttpProps>(
  postsHttpUrls.usePostComments
);

export type { Post };
export { Entity as PostEntity };
export { usePosts, usePost, usePostComments };
