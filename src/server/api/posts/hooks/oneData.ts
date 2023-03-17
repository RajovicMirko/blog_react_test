import useFetch from "../../../hooks/useFetch";
import { OneDataResponse, OneDataRequest } from "../types";
import http from "../http";
import queryKeys from "../queryKeys";
import usePagination from "../../../hooks/usePagination";
import { getPerPageByBreakpoints } from "../../../helpers";
import useBreakpoints from "../../../../hooks/useBreakpoints";
import { useEffect } from "react";
import { BaseHookParams } from "src/server/types";
import { useQueryClient } from "@tanstack/react-query";

const useGetOneData = ({
  id,
  entity,
  enabled,
}: BaseHookParams<OneDataRequest>) => {
  const queryClient = useQueryClient();
  const breakpoints = useBreakpoints();

  const {
    perPage,
    handleInit,
    setPerPage,
    setPage,
    paginationParams,
    ...restPatination
  } = usePagination({ per_page: getPerPageByBreakpoints(breakpoints) });

  const prevQueryData = queryClient.getQueriesData(
    queryKeys.oneData({ id, entity, page: 1 })
  )[0]?.[1];

  useEffect(() => {
    const newPerPage = getPerPageByBreakpoints(breakpoints);

    if (perPage !== newPerPage) {
      setPage(1);
      setPerPage(newPerPage);
    }
  }, [breakpoints]);

  const { axiosResponse, ...rest } = useFetch<OneDataResponse, OneDataRequest>({
    queryFn: http.getOneData,
    queryKey: queryKeys.oneData({ id, entity, ...paginationParams }),
    options: {
      enabled: !!id && !!entity && enabled,
      keepPreviousData: !!prevQueryData,
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
