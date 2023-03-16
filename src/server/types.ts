import { AxiosResponse } from "axios";

export type BaseRequest<Props = {}> = Props & {
  enabled?: boolean;
};

export type BaseApiMutationRequest = {
  token?: string;
};

export type MetaResponse = {
  pagination: Pagination;
};

export type BaseResponse<DataResponse> = AxiosResponse<{
  code: number;
  data: DataResponse;
  meta: MetaResponse;
}>;

export type Pagination = {
  total: number;
  pages: number;
  page: number;
  limit: number;
};

export type PaginationParams = {
  page?: number;
  per_page?: number;
  limit?: number;
};

export type GenerateQueryStringProps = { [key: string]: string | number };
