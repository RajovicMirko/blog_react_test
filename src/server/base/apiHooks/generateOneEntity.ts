import usePagination from "../hooks/usePagination";
import useFetch from "../hooks/useFetch";
import fetchers from "../fetchers";
import queryKeys from "../queryKeys";
import { useEffect } from "react";
import { BaseHookParams, BaseOneEntityRequest, BaseResponse } from "../types";

function generateOneEntity<Response, EntityType>(baseUrl: string) {
  return (
    {
      id,
      entity,
      options,
    }: BaseHookParams<
      BaseResponse<Response>,
      Required<BaseOneEntityRequest<any, EntityType>>
    > = {} as any
  ) => {
    const {
      isReady,
      getPaginationRequestParams,
      handleInitTotal,
      ...restPatination
    } = usePagination({ useBreakpoints: true });

    const { axiosResponse, ...rest } = useFetch<
      BaseOneEntityRequest<EntityType>,
      BaseResponse<Response>
    >({
      queryFn: fetchers.getEntity(baseUrl),
      queryKey: queryKeys.entity(baseUrl, {
        id,
        entity,
        ...getPaginationRequestParams(),
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

export default generateOneEntity;
