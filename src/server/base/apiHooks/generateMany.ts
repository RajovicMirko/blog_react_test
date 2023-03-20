import usePagination from "../hooks/usePagination";
import useFetch from "../hooks/useFetch";
import fetchers from "../fetchers";
import queryKeys from "../queryKeys";
import { useEffect } from "react";
import {
  BaseHookParams,
  BaseRequest,
  BaseResponse,
  GenerateQueryStringProps,
} from "../types";

function generateMany<Response>(baseUrl: string) {
  return ({ options }: BaseHookParams<BaseResponse<Response>, object> = {}) => {
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
      queryFn: fetchers.getMany(baseUrl),
      queryKey: queryKeys.many(baseUrl, getPaginationRequestParams()),
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
