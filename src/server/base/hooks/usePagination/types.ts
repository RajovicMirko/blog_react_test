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

export type PaginationProps = PaginationRequestParams;

export type PaginationResponse = {
  total: number;
  pages: number;
  page: number;
  limit: number;
};

export type PaginationHookReturn = {
  isFirstPage: boolean;
  isLastPage: boolean;
  handleNext: () => void;
  handleBack: () => void;
  handleInitTotal: (pagination: PaginationResponse) => void;
  getPaginationDisplayData: () => PaginationDisplayData;
  getPaginationRequestParams: () => PaginationRequestParams;
};
