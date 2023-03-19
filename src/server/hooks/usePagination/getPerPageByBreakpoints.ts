import { UseBreakpointsResponse } from "src/hooks/useBreakpoints";

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
