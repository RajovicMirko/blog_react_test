import { generateUrlParamPattern } from "src/server/base/helpers";

export enum Entity {
  comments = "comments",
}

export enum EntityHttpPropsKeys {
  "postId" = "postId",
}

export type EntityHttpProps = {
  postId: number | string;
};

export type OneHttpProps = { id: number };

export type Post = {
  id: number;
  user_id: number;
  title: string;
  body: string;
};

export const BASE_URL = "posts";

const postIdPattern = generateUrlParamPattern(EntityHttpPropsKeys.postId);

export const postsHttpUrls = {
  usePosts: BASE_URL,
  usePost: BASE_URL,
  usePostComments: `${BASE_URL}/${postIdPattern}/${Entity.comments}`,
};
