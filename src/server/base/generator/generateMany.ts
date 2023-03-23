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

function generateMany<Response extends object, Props = object>(url: string) {
  return ({
    options,
    pagination,
    ...restProps
  }: BasePropsHookParams<BaseResponse<Response>, Partial<Props>> = {}) => {
    const { getPaginationRequestParams, handleInitTotal, ...restPatination } =
      usePagination({ ...pagination });

    const { axiosResponse, ...rest } = useFetch<
      BaseProps<ObjectBaseParams>,
      BaseResponse<Response>
    >({
      queryFn: fetchers.getMany(url),
      queryKey: queryKeys.many(url, {
        ...getPaginationRequestParams(),
        ...restProps,
      }),
      options,
    });

    useEffect(() => {
      if (axiosResponse?.data) {
        handleInitTotal(axiosResponse?.data?.meta?.pagination);
      }
    }, [axiosResponse?.data]);

    return {
      data: axiosResponse?.data?.data,
      pagination: {
        getPaginationRequestParams,
        handleInitTotal,
        ...restPatination,
      },
      ...rest,
    };
  };
}

export default generateMany;
