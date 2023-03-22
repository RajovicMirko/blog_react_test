import { QueryKey, UseQueryOptions } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import {
  PaginationProps,
  PaginationRequestParams,
  PaginationResponse,
} from "./hooks/usePagination/types";

type Options<Response> = UseQueryOptions<Response, unknown, Response, QueryKey>;

export type ObjectBaseParams = { [key: string]: string | number };

export type BaseProps<Props = object> = Props & PaginationRequestParams;

export type BasePropsHookParams<Response, Props = void> = Props & {
  pagination?: PaginationProps;
  options?: Options<Response>;
};

export type BaseOneProps = { id?: string | number };

export type BaseOnePropsHookParams<Response, Props = void> = Props & {
  options?: Options<Response>;
};

// RESPONSE
export type MetaResponse = {
  pagination: PaginationResponse;
};

export type BaseResponse<DataResponse = object> = AxiosResponse<{
  code: number;
  data: DataResponse;
  meta: MetaResponse;
}>;
