import { QueryKey } from "@tanstack/react-query";
import { BaseRequest, BaseOneRequest, BaseOneEntityRequest } from "./types";

function many<Request>(baseUrl: string, props: BaseRequest<Request>): QueryKey {
  return [baseUrl, "many", props];
}

function one(baseUrl: string, props: BaseOneRequest): QueryKey {
  return [baseUrl, "one", props];
}

function entity<EntityType>(
  baseUrl: string,
  props: BaseOneEntityRequest<EntityType>
): QueryKey {
  return [baseUrl, "oneEntity", props.entity, props];
}

export default {
  many,
  one,
  entity,
};
