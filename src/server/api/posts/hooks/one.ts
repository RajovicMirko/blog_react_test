import useFetch from "../../../hooks/useFetch";
import { OneResponse, OneRequest, MutationRequest } from "../types";
import http from "../http";
import queryKeys from "../queryKeys";
import useMutation from "../../../hooks/useMutation";
import { useQueryClient } from "@tanstack/react-query";
import { BaseHookParams } from "src/server/types";

const useGetOne = ({ id, enabled }: BaseHookParams<OneRequest>) => {
  const queryClient = useQueryClient();

  const { axiosResponse, ...rest } = useFetch<OneResponse, OneRequest>({
    queryFn: http.getOne,
    queryKey: queryKeys.one({ id }),
    options: {
      enabled: !!id && enabled,
    },
  });

  const { mutate: create, isLoading: isLoadingCreate } = useMutation<
    OneResponse,
    MutationRequest
  >(http.createOne);

  const { mutate: update, isLoading: isLoadingUpdate } = useMutation<
    OneResponse,
    MutationRequest
  >(http.updateOne);

  const { mutate: remove, isLoading: isLoadingRemove } = useMutation<
    OneResponse,
    Pick<OneRequest, "id">
  >(http.deleteOne);

  const updateQueryData = (newData: OneResponse) => {
    queryClient.setQueryData(
      queryKeys.one({ id: newData?.data?.data?.id }),
      newData
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

export default useGetOne;
