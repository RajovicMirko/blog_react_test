import useFetch from "../../../hooks/useFetch";
import { OneDataResponse, OneDataRequest } from "../types";
import http from "../http";
import queryKeys from "../queryKeys";
import usePagination from "../../../hooks/usePagination";
import { getPerPageByBreakpoints } from "../../../helpers";
import useBreakpoints from "../../../../hooks/useBreakpoints";
import { useEffect } from "react";
import { BaseHookParams } from "src/server/types";

const useGetOneData = ({ id, enabled }: BaseHookParams<OneDataRequest>) => {
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
