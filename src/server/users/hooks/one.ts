import useFetch from "../../hooks/useFetch";
import { OneResponse, OneProps, User } from "../types";
import http from "../http";
import queryKeys from "../queryKeys";
import useMutation from "../../hooks/useMutation";
import { useQueryClient } from "@tanstack/react-query";

const useGetOne = ({ id, enabled }: OneProps) => {
  const queryClient = useQueryClient();

  const { axiosResponse, ...rest } = useFetch<OneResponse, OneProps>({
    queryFn: http.getOne,
    queryKey: queryKeys.one({ id }),
    options: {
      enabled: !!id && enabled,
    },
  });

  const { mutate: create, isLoading: isLoadingCreate } = useMutation<
    OneResponse,
    User
  >(http.createOne);

  const { mutate: update, isLoading: isLoadingUpdate } = useMutation<
    OneResponse,
    User
  >(http.updateOne);

  const { mutate: remove, isLoading: isLoadingRemove } = useMutation<
    OneResponse,
    OneProps
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
