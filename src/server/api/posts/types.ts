export const BASE_URL = "posts";

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
