import { Theme, useMediaQuery } from "@mui/material";

export type UseBreakpointsResponse = {
  isMobile: boolean;
  isTablet: boolean;
  isSmallScreen: boolean;
  isMediumScreen: boolean;
  isLargeScreen: boolean;
};

const useBreakpoints = (): UseBreakpointsResponse => {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.between("xs", "sm")
  );
  const isTablet = useMediaQuery((theme: Theme) =>
    theme.breakpoints.between("sm", "md")
  );
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.between("md", "lg")
  );
  const isMediumScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.between("lg", "xl")
  );
  const isLargeScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up("xl")
  );

  return {
    isMobile,
    isTablet,
    isSmallScreen,
    isMediumScreen,
    isLargeScreen,
  };
};

export default useBreakpoints;
