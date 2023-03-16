import { useEffect } from "react";
import useBreakpoints from "src/hooks/useBreakpoints";
import usePagination from "../../hooks/usePagination";
import useFetch from "../../hooks/useFetch";
import { getPerPageByBreakpoints } from "../../helpers";
import { PaginationParams } from "../../types";
import { AllResponse } from "../types";
import http from "../http";
import queryKeys from "../queryKeys";

const useGetAll = () => {
  const breakpoints = useBreakpoints();

  const {
    perPage,
    handleInit,
    setPerPage,
    setPage,
    paginationParams,
    ...restPatination
  } = usePagination({ per_page: getPerPageByBreakpoints(breakpoints) });

  useEffect(() => {
    const newPerPage = getPerPageByBreakpoints(breakpoints);

    if (perPage !== newPerPage) {
      setPage(1);
      setPerPage(newPerPage);
    }
  }, [breakpoints]);

  const { axiosResponse, ...rest } = useFetch<AllResponse, PaginationParams>({
    queryFn: http.getAll,
    queryKey: queryKeys.all(paginationParams),
    options: {
      enabled: !!perPage,
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
