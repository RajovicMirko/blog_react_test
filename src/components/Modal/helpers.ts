import { UseBreakpointsResponse } from "src/hooks/useBreakpoints";

export const getModalPaddingByBreakpoints = ({
  isMobile,
}: UseBreakpointsResponse) => {
  switch (true) {
    case isMobile:
      return "20px 30px";
    default:
      return "30px 50px";
  }
};

export const getModalMinWidthByBreakpoints = ({
  isMobile,
  isTablet,
}: UseBreakpointsResponse) => {
  switch (true) {
    case isMobile:
      return "200px";
    case isTablet:
      return "400px";
    default:
      return "600px";
  }
};
