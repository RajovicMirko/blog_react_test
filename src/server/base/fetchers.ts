import API from "src/utils/axios";
import { sleep } from "src/utils/sleep";
import {
  generateUrlParamPattern,
  generateUrlWithQueryString,
  replaceUrlParams,
} from "./helpers";
import {
  BaseOneProps,
  BaseProps,
  BaseResponse,
  ObjectBaseParams,
} from "./types";

function getMany<
  Props extends BaseProps<ObjectBaseParams>,
  Response extends BaseResponse<any>
>(url: string) {
  return async ({
    page,
    per_page,
    limit,
    ...restProps
  }: Props): Promise<Response> => {
    const replacedUrlParams = replaceUrlParams(url, restProps);

    const resultUrl = generateUrlWithQueryString(replacedUrlParams, {
      page,
      per_page,
      limit,
    } as any);

    const data = await API.get(resultUrl);
    await sleep();
    return data as Response;
  };
}

function getOne<Props extends BaseOneProps, Response>(url: string) {
  return async (props: Props): Promise<Response> => {
    const resultUrl = replaceUrlParams(
      `${url}/${generateUrlParamPattern("id")}`,
      props
    );

    const data = await API.get(resultUrl);
    await sleep();
    return data as Response;
  };
}

function createOne<Props extends object, Response>(url: string) {
  return async (body: Props): Promise<Response> => {
    const data = await API.post(url, body);
    await sleep();
    return data as Response;
  };
}

function updateOne<Props extends BaseOneProps, Response>(url: string) {
  return async (props: Props): Promise<Response> => {
    const resultUrl = replaceUrlParams(
      `${url}/${generateUrlParamPattern("id")}`,
      props
    );

    const data = await API.patch(resultUrl, props);
    await sleep();
    return data as Response;
  };
}

function deleteOne<Props extends BaseOneProps, Response>(url: string) {
  return async (props: Props): Promise<Response> => {
    const resultUrl = replaceUrlParams(
      `${url}/${generateUrlParamPattern("id")}`,
      props
    );

    const data = await API.delete(resultUrl);
    await sleep();
    return data as Response;
  };
}

export default {
  getMany,
  getOne,
  createOne,
  updateOne,
  deleteOne,
};
