import { useQueryClient } from "@tanstack/react-query";
import useFetch from "../hooks/useFetch";
import useMutation from "../hooks/useMutation";
import fetchers from "../fetchers";
import queryKeys from "../queryKeys";
import { BaseHookParams, BaseOneRequest, BaseResponse } from "../types";

function generateOne<Response extends Required<Pick<BaseOneRequest, "id">>>(
  baseUrl: string
) {
  return ({
    id,
    options,
  }: BaseHookParams<BaseResponse<Response>, BaseOneRequest> = {}) => {
    const queryClient = useQueryClient();

    const { axiosResponse, ...rest } = useFetch<
      BaseOneRequest,
      BaseResponse<Response>
    >({
      queryFn: fetchers.getOne(baseUrl),
      queryKey: queryKeys.one(baseUrl, { id }),
      options: {
        enabled: !!id && options?.enabled,
        ...options,
      },
    });

    const { mutate: create, isLoading: isLoadingCreate } = useMutation<
      BaseOneRequest,
      BaseResponse<Response>
    >(fetchers.createOne(baseUrl));

    const { mutate: update, isLoading: isLoadingUpdate } = useMutation<
      BaseOneRequest,
      BaseResponse<Response>
    >(fetchers.updateOne(baseUrl));

    const { mutate: remove, isLoading: isLoadingRemove } = useMutation<
      BaseOneRequest,
      BaseResponse<Response>
    >(fetchers.deleteOne(baseUrl));

    const updateQueryData = (axiosResponse: BaseResponse<Response>) => {
      queryClient.setQueryData(
        queryKeys.one(baseUrl, { id: axiosResponse?.data?.data?.id }),
        axiosResponse
      );
    };

    return {
      data: axiosResponse?.data?.data,
      ...rest,
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
