import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import useBreakpoints from "src/hooks/useBreakpoints";
import { getPerPageByBreakpoints } from "../helpers";
import { PaginationResponse, PaginationParams } from "../types";

const DEFAULT_PER_PAGE = 24;

export type PaginationDisplayData = {
  from: number;
  to: number;
};

export type PaginationHookResponse = {
  page: number;
  perPage: number;
  pages: number;
  isFirstPage: boolean;
  isLastPage: boolean;
  total: number;
  from: number;
  to: number;
  paginationParams: PaginationParams;
  handleNext: () => void;
  handleBack: () => void;
  handleInit: (pagination: PaginationResponse) => void;
  setPerPage: Dispatch<SetStateAction<number>>;
  setPage: Dispatch<SetStateAction<number>>;
};

const usePagination = (props: PaginationParams): PaginationHookResponse => {
  const breakpoints = useBreakpoints();

  const [page, setPage] = useState<number>(props?.page ?? 0);
  const [perPage, setPerPage] = useState<number>(props?.per_page ?? 0);
  const [pages, setPages] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  const isFirstPage: boolean = useMemo(() => page === 1, [page]);
  const isLastPage: boolean = useMemo(() => page === pages, [page, pages]);

  const handleInit = (pagination: PaginationResponse) => {
    setPages(pagination?.pages || 0);
    setTotal(pagination?.total || 0);
  };

  const handleNext = () => {
    if (!isLastPage) setPage((prevState) => prevState + 1);
  };
  const handleBack = () => {
    if (!isFirstPage) setPage((prevState) => prevState - 1);
  };

  const displayData: PaginationDisplayData = useMemo(() => {
    const to = page * perPage;
    const from = to - perPage + 1;

    return {
      to: to > total ? total : to,
      from,
    };
  }, [page, perPage, total]);

  useEffect(() => {
    if (props.useBreakpoints) {
      const newPerPage = getPerPageByBreakpoints(breakpoints, DEFAULT_PER_PAGE);

      if (perPage !== newPerPage) {
        setPage(1);
        setPerPage(newPerPage);
      }
    } else {
      setPerPage(DEFAULT_PER_PAGE);
    }
  }, [breakpoints, props.useBreakpoints]);

  return {
    page,
    perPage,
    pages,
    isFirstPage,
    isLastPage,
    total,
    ...displayData,
    paginationParams: { page, per_page: perPage, limit: perPage },
    handleNext,
    handleBack,
    handleInit,
    setPerPage,
    setPage,
  };
};

export default usePagination;
