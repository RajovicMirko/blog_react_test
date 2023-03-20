import {
  MutationFunction,
  MutationOptions,
  useMutation as useMutationQuery,
} from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getRoute } from "src/router/routesMap";
import handleError, { throwQueryErrorIfExists } from "../error";
import { BaseResponse } from "../types";

function useMutation<Props, Response extends BaseResponse<any>>(
  fn: MutationFunction<Response, Props>,
  options?: MutationOptions<Response>
) {
  const navigate = useNavigate();

  const { mutate, ...rest } = useMutationQuery<Response, unknown, any, unknown>(
    fn,
    {
      ...options,
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
    }
  );

  return {
    mutate,
    ...rest,
  };
}
export default useMutation;
