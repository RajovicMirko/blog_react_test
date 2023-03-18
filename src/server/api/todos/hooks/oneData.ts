import useFetch from "../../../hooks/useFetch";
import { OneDataResponse, OneDataRequest } from "../types";
import http from "../http";
import queryKeys from "../queryKeys";
import usePagination from "../../../hooks/usePagination";
import { useEffect } from "react";
import { BaseHookParams } from "src/server/types";

const useGetOneData = ({ id, enabled }: BaseHookParams<OneDataRequest>) => {
  const {
    perPage,
    handleInit,
    setPerPage,
    setPage,
    paginationParams,
    ...restPatination
  } = usePagination({ useBreakpoints: true });

  const { axiosResponse, ...rest } = useFetch<OneDataResponse, OneDataRequest>({
    queryFn: http.getOneData,
    queryKey: queryKeys.oneData({ id, ...paginationParams }),
    options: {
      enabled: !!id && enabled,
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

export default useGetOneData;
