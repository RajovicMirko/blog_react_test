import API from "src/utils/axios";
import { sleep } from "src/utils/sleep";
import { generateUrlWithQueryString } from "./helpers";
import {
  GenerateQueryStringProps,
  BaseRequest,
  BaseOneRequest,
  BaseOneEntityRequest,
  BaseResponse,
} from "./types";

function getMany<
  Props extends BaseRequest<GenerateQueryStringProps>,
  Response extends BaseResponse<any>
>(baseUrl: string) {
  return async (props: Props): Promise<Response> => {
    const url = generateUrlWithQueryString(baseUrl, props as any);

    const data = await API.get(url);
    await sleep();
    return data as Response;
  };
}

function getOne<Props extends BaseOneRequest, Response>(baseUrl: string) {
  return async ({ id }: Props): Promise<Response> => {
    const url = `/${baseUrl}/${id}`;

    const data = await API.get(url);
    await sleep();
    return data as Response;
  };
}

function getEntity<Response, EntityType>(baseUrl: string) {
  return async ({
    id,
    entity,
    ...pagination
  }: BaseOneEntityRequest<EntityType>): Promise<Response> => {
    const url = generateUrlWithQueryString(
      `/${baseUrl}/${id}/${entity}`,
      pagination as GenerateQueryStringProps
    );

    const data = await API.get(url);
    await sleep();
    return data as Response;
  };
}

function createOne<Props extends BaseOneRequest, Response>(baseUrl: string) {
  return async (body: Props): Promise<Response> => {
    const data = await API.post(baseUrl, body);
    await sleep();
    return data as Response;
  };
}

function updateOne<Props extends BaseOneRequest, Response>(baseUrl: string) {
  return async ({ id, ...body }: Props): Promise<Response> => {
    const url = `${baseUrl}/${id}`;

    const data = await API.patch(url, body);
    await sleep();
    return data as Response;
  };
}

function deleteOne<Props extends BaseOneRequest, Response>(baseUrl: string) {
  return async ({ id }: Props): Promise<Response> => {
    const url = `${baseUrl}/${id}`;

    const data = await API.delete(url);
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
