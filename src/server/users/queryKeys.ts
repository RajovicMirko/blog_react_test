import { PaginationParams } from "../types";
import { BASE_URL, OneDataProps, OneProps } from "./types";

const all = (props: PaginationParams) => [BASE_URL, "all", props];

const one = (props: OneProps) => [BASE_URL, "one", props];

const oneData = (props: OneDataProps) => [BASE_URL, "oneData", props];

export default {
  all,
  one,
  oneData,
};
