import { QueryKey } from "@tanstack/react-query";
import { BaseOneProps, BaseProps } from "./types";

function many<Request>(baseUrl: string, props: BaseProps<Request>): QueryKey {
  return [baseUrl, "many", props];
}

function one(baseUrl: string, props: BaseOneProps): QueryKey {
  return [baseUrl, "one", props?.id, props];
}

export default {
  many,
  one,
};
