import { GenerateQueryStringProps } from "src/server/types";

export const generateQueryString = (props: GenerateQueryStringProps) => {
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
  props: GenerateQueryStringProps
) => {
  const params = generateQueryString(props);
  const tmpUrl = [url, params].join("");
  return tmpUrl;
};
