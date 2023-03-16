export type CardFunction<DataType> = (
  dataItem: DataType,
  isTableView: boolean
) => JSX.Element;
