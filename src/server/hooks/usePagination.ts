import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { Pagination, PaginationParams } from "../types";

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
  handleInit: (pagination: Pagination) => void;
  setPerPage: Dispatch<SetStateAction<number>>;
  setPage: Dispatch<SetStateAction<number>>;
};

const usePagination = (props: PaginationParams): PaginationHookResponse => {
  const [page, setPage] = useState<number>(props?.page ?? 1);
  const [perPage, setPerPage] = useState<number>(props?.per_page ?? 16);
  const [limit] = useState<number>(props?.limit ?? 10);
  const [pages, setPages] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  const isFirstPage: boolean = useMemo(() => page === 1, [page]);
  const isLastPage: boolean = useMemo(() => page === pages, [page, pages]);

  const handleInit = (pagination: Pagination) => {
    setPages(pagination?.pages || 0);
    setTotal(pagination?.total || 0);
    setPerPage(props.per_page ?? perPage);
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

  return {
    page,
    perPage,
    pages,
    isFirstPage,
    isLastPage,
    total,
    ...displayData,
    paginationParams: { page, per_page: perPage, limit },
    handleNext,
    handleBack,
    handleInit,
    setPerPage,
    setPage,
  };
};

export default usePagination;
