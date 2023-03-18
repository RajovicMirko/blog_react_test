import { useEffect } from "react";
import useFetch from "../../../hooks/useFetch";
import usePagination from "../../../hooks/usePagination";
import { PaginationParams } from "../../../types";
import { AllResponse } from "../types";
import http from "../http";
import queryKeys from "../queryKeys";

const useGetAll = () => {
  const {
    perPage,
    handleInit,
    setPerPage,
    setPage,
    paginationParams,
    ...restPatination
  } = usePagination({ useBreakpoints: true });

  const { axiosResponse, ...rest } = useFetch<AllResponse, PaginationParams>({
    queryFn: http.getAll,
    queryKey: queryKeys.all(paginationParams),
    options: {
      enabled: !!perPage,
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
      perPage,
      handleInit,
      setPerPage,
      setPage,
      paginationParams,
      ...restPatination,
    },
    ...rest,
  };
};

export default useGetAll;
