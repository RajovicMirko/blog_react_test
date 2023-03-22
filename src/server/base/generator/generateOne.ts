import { useQueryClient } from "@tanstack/react-query";
import fetchers from "../fetchers";
import useFetch from "../hooks/useFetch";
import useMutation from "../hooks/useMutation";
import queryKeys from "../queryKeys";
import { BaseHookParams, BaseOneRequest, BaseResponse } from "../types";

function generateOne<
  Response extends Required<Pick<BaseOneRequest, "id">>,
  Props = object
>(url: string) {
  return ({
    options,
    ...restProps
  }: BaseHookParams<BaseResponse<Response>, BaseOneRequest<Props>>) => {
    const queryClient = useQueryClient();

    const { axiosResponse, ...restFetch } = useFetch<
      BaseOneRequest,
      BaseResponse<Response>
    >({
      queryFn: fetchers.getOne(url),
      queryKey: queryKeys.one(url, restProps),
      options: {
        enabled: !!Object.keys(restProps)?.length && options?.enabled,
        ...options,
      },
    });

    const { mutate: create, isLoading: isLoadingCreate } = useMutation<
      BaseOneRequest,
      BaseResponse<Response>
    >(fetchers.createOne(url));

    const { mutate: update, isLoading: isLoadingUpdate } = useMutation<
      BaseOneRequest,
      BaseResponse<Response>
    >(fetchers.updateOne(url));

    const { mutate: remove, isLoading: isLoadingRemove } = useMutation<
      BaseOneRequest,
      BaseResponse<Response>
    >(fetchers.deleteOne(url));

    const updateQueryData = (axiosResponse: BaseResponse<Response>) => {
      queryClient.setQueryData(
        queryKeys.one(url, { id: axiosResponse?.data?.data?.id }),
        axiosResponse
      );
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
      updateQueryData,
    };
  };
}

export default generateOne;
