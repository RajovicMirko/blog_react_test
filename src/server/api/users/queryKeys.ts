import { BASE_URL, ManyRequest, OneRequest, EntityRequest } from "./types";

const many = (props: ManyRequest) => [BASE_URL, "many", props];

const one = (props: OneRequest) => [BASE_URL, "one", props];

const entity = (props: EntityRequest) => [
  BASE_URL,
  "oneEntity",
  props.entity,
  props,
];

export default {
  many,
  one,
  entity,
};
