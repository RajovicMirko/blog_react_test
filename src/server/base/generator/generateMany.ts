import { useEffect } from "react";
import fetchers from "../fetchers";
import useFetch from "../hooks/useFetch";
import usePagination from "../hooks/usePagination";
import queryKeys from "../queryKeys";
import {
  BaseProps,
  BasePropsHookParams,
  BaseResponse,
  ObjectBaseParams,
} from "../types";

function generateMany<Response, Props = object>(url: string) {
  return (
    props: BasePropsHookParams<BaseResponse<Response>, Partial<Props>> = {}
  ) => {
    const { options, pagination, ...restProps } = props ?? {};
    const { enabled, ...restOptions } = options ?? {};

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
      BaseProps<ObjectBaseParams>,
      BaseResponse<Response>
    >({
      queryFn: fetchers.getMany(url),
      queryKey: queryKeys.many(url, {
        ...getPaginationRequestParams(),
        ...restProps,
      }),
      options: {
        enabled: isReady && enabled,
        staleTime: 5000,
        ...restOptions,
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
