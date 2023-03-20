export enum Entity {
  comments = "comments",
}

export type Post = {
  id: number;
  user_id: number;
  title: string;
  body: string;
};
