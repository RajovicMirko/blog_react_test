import { QueryKey, UseQueryOptions } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import {
  PaginationProps,
  PaginationRequestParams,
  PaginationResponse,
} from "./hooks/usePagination/types";

export type ObjectBaseParams = { [key: string]: string | number };

export type BaseProps<Props = void> = Props & PaginationRequestParams;

export type BasePropsHookParams<Response, Props = void> = Props & {
  pagination?: PaginationProps;
  options?: UseQueryOptions<Response, unknown, Response, QueryKey>;
};

export type BaseOneProps = { id?: string | number };

export type BaseOnePropsHookParams<Response, Props = void> = Props & {
  options?: UseQueryOptions<Response, unknown, Response, QueryKey>;
};

// RESPONSE
export type MetaResponse = {
  pagination: PaginationResponse;
};

export type BaseResponse<DataResponse> = AxiosResponse<{
  code: number;
  data: DataResponse;
  meta: MetaResponse;
}>;
