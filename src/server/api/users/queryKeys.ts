import { AllRequest, BASE_URL, OneDataRequest, OneRequest } from "./types";

const all = (props: AllRequest) => [BASE_URL, "all", props];

const one = (props: OneRequest) => [BASE_URL, "one", props];

const oneData = (props: OneDataRequest) => [
  BASE_URL,
  "oneData",
  props.entity,
  props,
];

export default {
  all,
  one,
  oneData,
};
