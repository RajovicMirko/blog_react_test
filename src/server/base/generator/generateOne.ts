import { useQueryClient } from "@tanstack/react-query";
import fetchers from "../fetchers";
import useFetch from "../hooks/useFetch";
import useMutation from "../hooks/useMutation";
import queryKeys from "../queryKeys";
import { BaseOneProps, BaseOnePropsHookParams, BaseResponse } from "../types";

function generateOne<Response extends BaseOneProps>(url: string) {
  return ({
    options,
    ...restProps
  }: BaseOnePropsHookParams<
    BaseResponse<Response>,
    Partial<Response>
  > = {}) => {
    const queryClient = useQueryClient();

    const { axiosResponse, ...restFetch } = useFetch<
      BaseOneProps,
      BaseResponse<Response>
    >({
      queryFn: fetchers.getOne(url),
      queryKey: queryKeys.one(url, restProps),
      options: {
        enabled: !!restProps?.id && options?.enabled,
        ...options,
      },
    });

    const { mutate: create, isLoading: isLoadingCreate } = useMutation<
      BaseResponse<Response>,
      Omit<Response, "id">
    >(fetchers.createOne(url));

    const { mutate: update, isLoading: isLoadingUpdate } = useMutation<
      BaseResponse<Response>,
      Partial<Response>
    >(fetchers.updateOne(url));

    const { mutate: remove, isLoading: isLoadingRemove } = useMutation<
      BaseResponse<Response>,
      BaseOneProps
    >(fetchers.deleteOne(url));

    const updateOne = (
      axiosResponse: BaseResponse<Response>,
      id: string | number
    ) => {
      queryClient.setQueryData(queryKeys.one(url, { id }), axiosResponse);
    };

    const updateMany = (
      tmpUrl: string,
      updaterFn: (
        prevState?: BaseResponse<Response[]>
      ) => BaseResponse<Response[]>
    ) => {
      queryClient.setQueriesData(queryKeys.many(tmpUrl, {}), updaterFn);
    };

    return {
      data: axiosResponse?.data?.data,
      ...restFetch,
      create,
      isLoadingCreate,
      update,
      isLoadingUpdate,
      remove,
      isLoadingRemove,
      updateOne,
      updateMany,
    };
  };
}

export default generateOne;
