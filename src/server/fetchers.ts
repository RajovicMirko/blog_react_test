import API from "src/utils/axios";
import { sleep } from "src/utils/sleep";
import { generateUrlWithQueryString } from "./helpers";
import { GenerateQueryStringProps } from "./types";

function getAll<Props extends GenerateQueryStringProps, Response>(
  baseUrl: string
) {
  return async (props: Props): Promise<Response> => {
    const url = generateUrlWithQueryString(baseUrl, props);
    const data = await API.get(url);
    await sleep();
    return data as Response;
  };
}

function getOne<Props extends GenerateQueryStringProps, Response>(
  baseUrl: string
) {
  return async ({ id }: Props): Promise<Response> => {
    const url = `/${baseUrl}/${id}`;
    await sleep();
    return (await API.get(url)) as Response;
  };
}

function getOneData<Props extends GenerateQueryStringProps, Response>(
  baseUrl: string
) {
  return async ({ id, entity, ...pagination }: Props): Promise<Response> => {
    const url = generateUrlWithQueryString(
      `/${baseUrl}/${id}/${entity}`,
      pagination
    );

    const data = await API.get(url);
    await sleep();
    return data as Response;
  };
}

function createOne<Props extends GenerateQueryStringProps, Response>(
  baseUrl: string
) {
  return async (props: Props): Promise<Response> => {
    const data = await API.post(baseUrl, props);
    await sleep();
    return data as Response;
  };
}

function updateOne<Props extends GenerateQueryStringProps, Response>(
  baseUrl: string
) {
  return async ({ id, ...rest }: Props): Promise<Response> => {
    const data = await API.patch(`${baseUrl}/${id}`, rest);
    await sleep();
    return data as Response;
  };
}

function deleteOne<Props extends GenerateQueryStringProps, Response>(
  baseUrl: string
) {
  return async ({ id }: Props): Promise<Response> => {
    const data = await API.delete(`${baseUrl}/${id}`);
    await sleep();
    return data as Response;
  };
}

export default {
  getAll,
  getOne,
  getOneData,
  createOne,
  updateOne,
  deleteOne,
};
