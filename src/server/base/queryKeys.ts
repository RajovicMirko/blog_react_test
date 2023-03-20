import { QueryKey } from "@tanstack/react-query";
import { BaseRequest, BaseOneRequest, BaseOneEntityRequest } from "./types";

function many<Request>(baseUrl: string, props: BaseRequest<Request>): QueryKey {
  return [baseUrl, "many", props];
}

function one<Request>(
  baseUrl: string,
  props: BaseOneRequest<Request>
): QueryKey {
  return [baseUrl, "one", props];
}

function entity<Request>(
  baseUrl: string,
  props: BaseOneEntityRequest<Request>
): QueryKey {
  return [baseUrl, "oneEntity", props.entity, props];
}

export default {
  many,
  one,
  entity,
};
