import { PaginationHookReturn } from "src/server/base/hooks/usePagination/types";
import useScroll from "../../hooks/useScroll";
import useToggle from "../../hooks/useToggle";
import { LinearLoading } from "../Loading/LinearLoading";
import GridList from "./components/GridList";
import GridListItem from "./components/GridListItem";
import GridMain from "./components/GridMain";
import GridNoData from "./components/GridNoData";
import GridPaginationControl from "./components/GridPaginationControl";
import { SCROLLABLE_CLASS } from "./constants";
import { CardFunction } from "./types";

type GridPaginationProps<DataType = void> = {
  data?: DataType[];
  pagination: PaginationHookReturn;
  card: CardFunction<DataType>;
  isLoading: boolean;
  isDataEmpty?: boolean;
  emptyDataText?: string;
  list?: boolean;
  useSwitch?: boolean;
};

function GridPagination<DataType>({
  data,
  pagination,
  card,
  isLoading = false,
  isDataEmpty = false,
  emptyDataText = "No data found",
  list = false,
  useSwitch = false,
}: GridPaginationProps<DataType>) {
  const { handleScrollToTop } = useScroll();
  const [listView, setListView] = useToggle(list);

  handleScrollToTop(
    !!isLoading,
    document.querySelector(`.${SCROLLABLE_CLASS}`) as Element
  );

  return (
    <>
      <GridMain>
        <LinearLoading isLoading={isLoading} />

        {isDataEmpty && !isLoading && <GridNoData text={emptyDataText} />}

        {!isDataEmpty && (
          <>
            <GridList listView={listView}>
              {data?.map((item: DataType, i: number) => (
                <GridListItem
                  key={`grid-list-item-${i}`}
                  data={item}
                  card={card}
                  listView={listView}
                />
              ))}
            </GridList>
            <GridPaginationControl
              useSwitch={useSwitch}
              pagination={pagination}
              listView={listView}
              onLayoutViewClick={setListView}
            />
          </>
        )}
      </GridMain>
    </>
  );
}

export default GridPagination;
