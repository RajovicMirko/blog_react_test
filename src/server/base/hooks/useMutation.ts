import {
  MutationFunction,
  MutationOptions,
  useMutation as useMutationQuery,
} from "@tanstack/react-query";
import handleError, { throwQueryErrorIfExists } from "../error";
import { BaseResponse } from "../types";

function useMutation<Props, Response extends BaseResponse<any>>(
  fn: MutationFunction<Response, Props>,
  options?: MutationOptions<Response>
) {
  const { mutate, ...rest } = useMutationQuery<Response, unknown, any, unknown>(
    fn,
    {
      ...options,
      onSuccess: (response) => {
        throwQueryErrorIfExists(response);
      },
      onError: (error) => {
        handleError(error);
      },
    }
  );

  return {
    mutate,
    ...rest,
  };
}
export default useMutation;
