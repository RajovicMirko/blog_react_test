import API from "src/utils/axios";
import { sleep } from "src/utils/sleep";
import { generateUrlWithQueryString } from "./helpers";
import { GenerateQueryStringProps, BaseRequest } from "./types";

function getMany<Props, Response>(baseUrl: string) {
  return async (props: Props): Promise<Response> => {
    const url = generateUrlWithQueryString(
      baseUrl,
      props as GenerateQueryStringProps
    );
    const data = await API.get(url);
    await sleep();
    return data as Response;
  };
}

function getOne<Props extends BaseRequest, Response>(baseUrl: string) {
  return async ({ id }: Props): Promise<Response> => {
    const url = `/${baseUrl}/${id}`;
    const data = await API.get(url);
    await sleep();
    return data as Response;
  };
}

function getEntity<Props extends BaseRequest, Response>(baseUrl: string) {
  return async ({ id, entity, ...pagination }: Props): Promise<Response> => {
    const url = generateUrlWithQueryString(
      `/${baseUrl}/${id}/${entity}`,
      pagination as GenerateQueryStringProps
    );
    const data = await API.get(url);
    await sleep();
    return data as Response;
  };
}

function createOne<Props extends BaseRequest, Response>(baseUrl: string) {
  return async (props: Props): Promise<Response> => {
    const data = await API.post(baseUrl, props);
    await sleep();
    return data as Response;
  };
}

function updateOne<Props extends BaseRequest, Response>(baseUrl: string) {
  return async ({ id, ...rest }: Props): Promise<Response> => {
    const data = await API.patch(`${baseUrl}/${id}`, rest);
    await sleep();
    return data as Response;
  };
}

function deleteOne<Props extends BaseRequest, Response>(baseUrl: string) {
  return async ({ id }: Props): Promise<Response> => {
    const data = await API.delete(`${baseUrl}/${id}`);
    await sleep();
    return data as Response;
  };
}

export default {
  getMany,
  getOne,
  getEntity,
  createOne,
  updateOne,
  deleteOne,
};
