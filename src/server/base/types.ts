import { QueryKey, UseQueryOptions } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import {
  PaginationRequestParams,
  PaginationResponse,
} from "./hooks/usePagination/types";

export type ObjectBaseParams = { [key: string]: string | number };

// HOOK PARAMS
export type BaseHookParams<Response, Props = void> = Props & {
  options?: UseQueryOptions<Response, unknown, Response, QueryKey>;
};

// REQUEST
export type BaseRequest<Props = void> = Props & PaginationRequestParams;

export type BaseOneRequest<Props = void> = Props & { id?: string | number };

// RESPONSE
export type MetaResponse = {
  pagination: PaginationResponse;
};

export type BaseResponse<DataResponse> = AxiosResponse<{
  code: number;
  data: DataResponse;
  meta: MetaResponse;
}>;
