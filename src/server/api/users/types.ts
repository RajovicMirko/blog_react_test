export enum UserStatus {
  active = "active",
  inactive = "inactive",
}

export enum Entity {
  posts = "posts",
  todos = "todos",
}

export type User = {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: UserStatus;
};
