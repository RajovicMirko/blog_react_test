export type PaginationDisplayData = {
  from: number;
  to: number;
  total: number;
  pages: number;
};

export type PaginationRequestParams = {
  page?: number;
  per_page?: number;
  limit?: number;
};

export type PaginationProps = PaginationRequestParams & {
  useBreakpoints?: boolean;
};

export type PaginationResponse = {
  total: number;
  pages: number;
  page: number;
  limit: number;
};

export type PaginationHookReturn = {
  isFirstPage: boolean;
  isLastPage: boolean;
  isReady: boolean;
  handleNext: () => void;
  handleBack: () => void;
  handleInitTotal: (pagination: PaginationResponse) => void;
  getPaginationDisplayData: () => PaginationDisplayData;
  getPaginationRequestParams: () => PaginationRequestParams;
};
