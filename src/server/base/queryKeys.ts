import { QueryKey } from "@tanstack/react-query";
import { BaseOneRequest, BaseRequest } from "./types";

function many<Request>(baseUrl: string, props: BaseRequest<Request>): QueryKey {
  return [baseUrl, "many", props];
}

function one(baseUrl: string, props: BaseOneRequest<object>): QueryKey {
  return [baseUrl, "one", props?.id, props];
}

export default {
  many,
  one,
};
