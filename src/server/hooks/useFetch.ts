import {
  QueryFunction,
  QueryKey,
  useQuery,
  useQueryClient,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getRoute } from "src/router/routesMap";
import handleError from "../error";
import { throwQueryErrorIfExists } from "../error/helpers";
import { BaseResponse } from "../types";

type UseFetchProps<Response, Props = void> = {
  queryKey: readonly unknown[];
  queryFn: (props: Props) => Promise<Response>;
  options?: UseQueryOptions<Response, unknown, Response, QueryKey>;
};

export default function useFetch<
  Response extends BaseResponse<any>,
  Props = void
>({ queryKey, queryFn, options = {} }: UseFetchProps<Response, Props>) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const queryFnWithProps: QueryFunction<any, any> = async () =>
    await queryFn(queryKey[queryKey.length - 1] as Props);

  const {
    data: axiosData,
    refetch,
    ...rest
  }: UseQueryResult<Response, unknown> = useQuery<
    Response,
    unknown,
    Response,
    QueryKey
  >(queryKey, queryFnWithProps, {
    staleTime: Infinity,
    refetchInterval: false,
    refetchIntervalInBackground: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    onSuccess: (response) => {
      try {
        throwQueryErrorIfExists(response);
      } catch (error) {
        handleError(error);
        setTimeout(() => navigate(getRoute.users()), 0);
      }
    },
    onError: (error) => {
      handleError(error);
    },
    ...options,
  });

  const handleRefetch = () => {
    queryClient.invalidateQueries(queryKey);
  };

  // TODO: find a way to initialize isInitialLoading
  const handleRefetchAll = () => {
    queryClient.invalidateQueries(queryKey);
  };

  const isLoading =
    (rest.isLoading || rest.isFetching) && !rest.isInitialLoading;

  return {
    ...rest,
    axiosResponse: axiosData,
    refetch: handleRefetch,
    refetchAll: handleRefetchAll,
    isLoading,
    isDataEmpty: !axiosData && (rest.isSuccess || rest.isError),
  };
}
