import { ObjectBaseParams } from "./types";

export const generateUrlParamPattern = (str: string) => `{${str}}`;

export const replaceUrlParams = (
  url: string,
  params?: ObjectBaseParams
): string => {
  if (!params) return url;

  return Object.keys(params).reduce(
    (acc: string, key) =>
      acc.replace(generateUrlParamPattern(key), params[key].toString()),
    url
  );
};

export const generateQueryString = (props: ObjectBaseParams) => {
  const stringResult = Object.entries(props).reduce(
    (acc: string, [key, val]: any, i: number) => {
      if (val) {
        const str = `${key}=${val}`;
        return `${acc}${i === 0 ? str : `&${str}`}`;
      }
      return acc;
    },
    ""
  );

  return stringResult ? `?${stringResult}` : "";
};

export const generateUrlWithQueryString = (
  url: string,
  props: ObjectBaseParams
) => {
  const params = generateQueryString(props);
  const tmpUrl = [url, params].join("");
  return tmpUrl;
};
