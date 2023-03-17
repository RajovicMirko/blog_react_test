import API from "src/utils/axios";
import { sleep } from "src/utils/sleep";
import { generateUrlWithQueryString } from "../../helpers";
import { PaginationParams } from "../../types";
import {
  BASE_URL,
  HttpAllResponse,
  HttpOneResponse,
  Todo,
  OneProps,
  OneDataProps,
} from "./types";

const getAll = async (props: PaginationParams): HttpAllResponse => {
  const url = generateUrlWithQueryString(BASE_URL, props);
  const data = await API.get(url);
  await sleep();
  return data;
};

const getOne = async ({ id }: OneProps): HttpOneResponse => {
  const url = `/${BASE_URL}/${id}`;
  await sleep();
  return await API.get(url);
};

const getOneData = async ({
  id,
  entity,
  ...pagination
}: OneDataProps): HttpOneResponse => {
  const url = generateUrlWithQueryString(
    `/${BASE_URL}/${id}/${entity}`,
    pagination
  );

  const data = await API.get(url);
  await sleep();
  return data;
};

const createOne = async (props: Todo): HttpOneResponse => {
  const data = await API.post(BASE_URL, props);
  await sleep();
  return data;
};

const updateOne = async ({ id, ...rest }: Todo): HttpOneResponse => {
  const data = await API.patch(`${BASE_URL}/${id}`, rest);
  await sleep();
  return data;
};

const deleteOne = async ({ id }: OneProps): HttpOneResponse => {
  const data = await API.delete(`${BASE_URL}/${id}`);
  await sleep();
  return data;
};

export default {
  getAll,
  getOne,
  getOneData,
  createOne,
  updateOne,
  deleteOne,
};
