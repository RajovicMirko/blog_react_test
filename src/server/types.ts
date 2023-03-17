import { AxiosResponse } from "axios";

export type PaginationResponse = {
  total: number;
  pages: number;
  page: number;
  limit: number;
};

export type MetaResponse = {
  pagination: PaginationResponse;
};

export type GenerateQueryStringProps = { [key: string]: string | number };

export type BaseHookParams<Props = void> = Props & {
  enabled?: boolean;
};

export type PaginationParams = {
  page?: number;
  per_page?: number;
  limit?: number;
};

export type BaseRequest<Props = void> = Props & PaginationParams;

export type BaseApiMutationRequest = {
  token?: string;
};

export type BaseResponse<DataResponse> = AxiosResponse<{
  code: number;
  data: DataResponse;
  meta: MetaResponse;
}>;
