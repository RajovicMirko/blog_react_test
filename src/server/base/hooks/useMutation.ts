import {
  MutationFunction,
  useMutation as useMutationQuery,
} from "@tanstack/react-query";
import handleError, { throwQueryErrorIfExists } from "../error";

function useMutation<Response, Props>(fn: MutationFunction<Response, Props>) {
  const { mutate, ...rest } = useMutationQuery<
    Response,
    unknown,
    Props,
    unknown
  >({
    mutationFn: fn,
    onSuccess: (response: any) => {
      throwQueryErrorIfExists(response);
    },
    onError: (error) => {
      handleError(error);
    },
  });

  return {
    mutate,
    ...rest,
  };
}
export default useMutation;
