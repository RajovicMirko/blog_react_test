import { useEffect, useMemo, useState } from "react";
import useBreakpoints from "src/hooks/useBreakpoints";
import { getPerPageByBreakpoints } from "./getPerPageByBreakpoints";
import {
  PaginationDisplayData,
  PaginationHookReturn,
  PaginationProps,
  PaginationResponse,
} from "./types";

const DEFAULT_PER_PAGE = 24;

const usePagination = (props: PaginationProps): PaginationHookReturn => {
  const breakpoints = useBreakpoints();

  const [isReady, setIsReady] = useState<boolean>(!props.useBreakpoints);
  const [page, setPage] = useState<number>(props?.page ?? 1);
  const [perPage, setPerPage] = useState<number>(
    props?.per_page ?? DEFAULT_PER_PAGE
  );
  const [pages, setPages] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  const isFirstPage: boolean = useMemo(() => page === 1, [page]);
  const isLastPage: boolean = useMemo(() => page === pages, [page, pages]);

  const handleInitTotal = ({ total }: PaginationResponse) => {
    if (total) {
      setTotal(total || 0);
      setPages(Math.ceil(total / perPage) ?? 0);
    }
  };

  const handleNext = () => {
    if (!isLastPage) setPage((prevState) => prevState + 1);
  };
  const handleBack = () => {
    if (!isFirstPage) setPage((prevState) => prevState - 1);
  };

  const getPaginationDisplayData = (): PaginationDisplayData => {
    const to = page * perPage;
    const from = to - perPage + 1;

    return {
      to: to > total ? total : to,
      from,
      pages,
      total,
    };
  };

  const getPaginationRequestParams = () => ({
    page,
    per_page: perPage,
  });

  useEffect(() => {
    if (props.useBreakpoints) {
      const breakpointPerPage = getPerPageByBreakpoints(
        breakpoints,
        DEFAULT_PER_PAGE
      );

      if (!!breakpointPerPage && perPage !== breakpointPerPage) {
        setPage(1);
        setPerPage(breakpointPerPage);
      }

      if (breakpointPerPage) setIsReady(true);
    }
  }, [breakpoints, props.useBreakpoints]);

  return {
    isFirstPage,
    isLastPage,
    isReady,
    handleInitTotal,
    handleNext,
    handleBack,
    getPaginationDisplayData,
    getPaginationRequestParams,
  };
};

export default usePagination;
