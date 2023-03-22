import { useEffect } from "react";
import fetchers from "../fetchers";
import useFetch from "../hooks/useFetch";
import usePagination from "../hooks/usePagination";
import queryKeys from "../queryKeys";
import {
  BaseHookParams,
  BaseRequest,
  BaseResponse,
  GenerateQueryStringProps,
} from "../types";

function generateMany<Response, Props = object>(url: string) {
  return (props: BaseHookParams<BaseResponse<Response>, Props>) => {
    const { options, ...restProps } = props ?? {};

    const {
      isReady,
      getPaginationRequestParams,
      handleInitTotal,
      ...restPatination
    } = usePagination({ useBreakpoints: true });

    const { axiosResponse, ...rest } = useFetch<
      BaseRequest<GenerateQueryStringProps>,
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
