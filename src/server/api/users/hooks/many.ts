import { useEffect } from "react";
import useFetch from "../../../hooks/useFetch";
import usePagination from "../../../hooks/usePagination";
import { PaginationParams } from "../../../types";
import { ManyResponse } from "../types";
import http from "../http";
import queryKeys from "../queryKeys";

const useGetAll = () => {
  const { isReady, perPage, handleInit, paginationParams, ...restPatination } =
    usePagination({ useBreakpoints: true });

  const { axiosResponse, ...rest } = useFetch<ManyResponse, PaginationParams>({
    queryFn: http.getMany,
    queryKey: queryKeys.many(paginationParams),
    options: {
      enabled: isReady,
      staleTime: 5000,
    },
  });

  useEffect(() => {
    if (axiosResponse?.data) {
      handleInit(axiosResponse?.data?.meta?.pagination);
    }
  }, [axiosResponse?.data]);

  return {
    data: axiosResponse?.data?.data,
    pagination: {
      isReady,
      perPage,
      handleInit,
      paginationParams,
      ...restPatination,
    },
    ...rest,
  };
};

export default useGetAll;
