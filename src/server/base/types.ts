import { QueryKey, UseQueryOptions } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import {
  PaginationRequestParams,
  PaginationResponse,
} from "./hooks/usePagination/types";

export type BaseHookParams<Response, Props = void> = Props & {
  options?: UseQueryOptions<Response, unknown, Response, QueryKey>;
};

export type BaseRequest<Props = void> = Props & PaginationRequestParams;

type OneRequestParams = { id?: string | number };
export type BaseOneRequest = BaseRequest<OneRequestParams>;

export type BaseOneEntityRequest<EntityType> = BaseRequest<
  Required<
    OneRequestParams & {
      entity: EntityType;
    }
  >
>;

export type BaseApiMutationRequest = {
  token?: string;
};

export type MetaResponse = {
  pagination: PaginationResponse;
};

export type BaseResponse<DataResponse> = AxiosResponse<{
  code: number;
  data: DataResponse;
  meta: MetaResponse;
}>;

export type GenerateQueryStringProps = { [key: string]: string | number };
