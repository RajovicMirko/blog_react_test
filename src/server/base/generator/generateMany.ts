import { useEffect } from "react";
import fetchers from "../fetchers";
import useFetch from "../hooks/useFetch";
import usePagination from "../hooks/usePagination";
import { PaginationProps } from "../hooks/usePagination/types";
import queryKeys from "../queryKeys";
import {
  BaseHookParams,
  BaseRequest,
  BaseResponse,
  ObjectBaseParams,
} from "../types";

function generateMany<Response, Props = object>(url: string) {
  return (
    props: BaseHookParams<
      BaseResponse<Response>,
      Props & { pagination?: PaginationProps }
    >
  ) => {
    const { options, pagination, ...restProps } = props ?? {};

    const {
      isReady,
      getPaginationRequestParams,
      handleInitTotal,
      ...restPatination
    } = usePagination({
      ...pagination,
      useBreakpoints: pagination?.useBreakpoints && !pagination?.per_page,
    });

    const { axiosResponse, ...rest } = useFetch<
      BaseRequest<ObjectBaseParams>,
      BaseResponse<Response>
    >({
      queryFn: fetchers.getMany(url),
      queryKey: queryKeys.many(url, {
        ...getPaginationRequestParams(),
        ...restProps,
      }),
      options: {
        enabled: isReady && options?.enabled,
        staleTime: 5000,
        ...options,
      },
    });

    useEffect(() => {
      if (axiosResponse?.data) {
        handleInitTotal(axiosResponse?.data?.meta?.pagination);
      }
    }, [axiosResponse?.data]);

    return {
      data: axiosResponse?.data?.data,
      pagination: {
        isReady,
        getPaginationRequestParams,
        handleInitTotal,
        ...restPatination,
      },
      ...rest,
    };
  };
}

export default generateMany;
