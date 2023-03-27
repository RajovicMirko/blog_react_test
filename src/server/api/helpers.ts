import { BaseOneProps, BaseResponse } from "../base/types";

export function updaterFunctionCreate<Response extends BaseOneProps>(
  response: BaseResponse<Response>
) {
  return (prevState?: BaseResponse<Response[]>) => {
    if (prevState?.data?.data) {
      const newState = { ...prevState } as BaseResponse<Response[]>;

      newState.data.data = [response?.data?.data, ...newState.data.data];

      return newState;
    }

    return prevState;
  };
}

export function updaterFunctionUpdate<Response extends BaseOneProps>(
  response: BaseResponse<Response>
) {
  return (prevState?: BaseResponse<Response[]>) => {
    if (prevState?.data?.data) {
      const newState = { ...prevState } as BaseResponse<Response[]>;

      newState.data.data = prevState?.data?.data.map((item) =>
        item.id === response.data.data.id ? response.data.data : item
      ) as Response[];

      return newState;
    }

    return prevState;
  };
}

export function updaterFunctionRemove<Response extends BaseOneProps>(
  id: number | string
) {
  return (prevState?: BaseResponse<Response[]>) => {
    if (prevState?.data?.data) {
      const newState = { ...prevState } as BaseResponse<Response[]>;

      newState.data.data = prevState?.data?.data.filter(
        (item) => item.id !== id
      ) as Response[];

      return newState;
    }

    return prevState;
  };
}
