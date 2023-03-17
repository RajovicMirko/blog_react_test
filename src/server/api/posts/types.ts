import { BaseRequest, BaseResponse, PaginationParams } from "../../types";

export const BASE_URL = "posts";

export enum Entity {
  comments = "comments",
}

export type Post = {
  id: number;
  user_id: number;
  title: string;
  body: string;
};

export type AllRequest = PaginationParams;
export type AllResponse = BaseResponse<Post[]>;

export type OneRequest = BaseRequest<{ id?: Post["id"] }>;
export type OneResponse = BaseResponse<Post>;

export type OneDataRequest = OneRequest & { entity: Entity };
export type OneDataResponse = BaseResponse<any>;

export type MutationRequest = Post;
