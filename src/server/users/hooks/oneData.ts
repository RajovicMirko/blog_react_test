import useFetch from "../../hooks/useFetch";
import { OneDataResponse, OneDataProps } from "../types";
import http from "../http";
import queryKeys from "../queryKeys";
import usePagination from "../../hooks/usePagination";
import { getPerPageByBreakpoints } from "../../helpers";
import useBreakpoints from "../../../hooks/useBreakpoints";
import { useEffect } from "react";

const useGetOneData = ({ id, entity, enabled }: OneDataProps) => {
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

  const { axiosResponse, ...rest } = useFetch<OneDataResponse, OneDataProps>({
    queryFn: http.getOneData,
    queryKey: queryKeys.oneData({ id, entity }),
    options: {
      enabled: !!id && !!entity && enabled,
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
