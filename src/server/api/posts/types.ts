export const BASE_URL = "posts";

export enum Entity {
  comments = "comments",
}

export const POST_ID_KEY = "postId";
export type EntityHttpProps = {
  [POST_ID_KEY]: number | string;
};

export type OneHttpProps = { id: number };

export type Post = {
  id: number;
  user_id: number;
  title: string;
  body: string;
};
