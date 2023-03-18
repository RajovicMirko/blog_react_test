import { UseBreakpointsResponse } from "src/hooks/useBreakpoints";
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

export const getPerPageByBreakpoints = (
  {
    isMobile,
    isTablet,
    isSmallScreen,
    isMediumScreen,
    isLargeScreen,
  }: UseBreakpointsResponse,
  defaultPerPage: number
) => {
  switch (true) {
    case isLargeScreen:
      return defaultPerPage;
    case isMediumScreen:
      return 15;
    case isSmallScreen:
    case isTablet:
      return 10;
    case isMobile:
      return 6;
    default:
      return 0;
  }
};
