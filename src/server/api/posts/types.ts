import { BaseRequest, BaseResponse } from "../../types";

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

export type OneProps = BaseRequest<{
  id?: Post["id"];
}>;

export type OneDataProps = BaseRequest<
  OneProps & {
    entity: Entity;
  }
>;

export type AllResponse = BaseResponse<Post[]>;
export type HttpAllResponse = Promise<AllResponse>;

export type OneResponse = BaseResponse<Post>;
export type HttpOneResponse = Promise<OneResponse>;

export type OneDataResponse = BaseResponse<any>;
export type HttpOneDataResponse = Promise<OneDataResponse>;
