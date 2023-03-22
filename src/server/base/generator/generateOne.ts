import { useQueryClient } from "@tanstack/react-query";
import fetchers from "../fetchers";
import useFetch from "../hooks/useFetch";
import useMutation from "../hooks/useMutation";
import queryKeys from "../queryKeys";
import { BaseHookParams, BaseOneProps, BaseResponse } from "../types";

function generateOne<Response extends BaseOneProps>(url: string) {
  return ({
    options,
    ...restProps
  }: BaseHookParams<BaseResponse<Response>, Partial<Response>>) => {
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
      Response
    >(fetchers.createOne(url));

    const { mutate: update, isLoading: isLoadingUpdate } = useMutation<
      BaseResponse<Response>,
      Partial<Response>
    >(fetchers.updateOne(url));

    const { mutate: remove, isLoading: isLoadingRemove } = useMutation<
      BaseResponse<Response>,
      Required<BaseOneProps>
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
