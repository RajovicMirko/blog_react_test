import dayjs from "dayjs";

const DATE_PATTERN = "DD.MM.YYYY";
const TIME_PATTERN = "hh:mm";
const DATE_REQUEST_PATTERN = "YYYY-MM-DDThh:mm:ss";

export const DateFormats = {
  date: DATE_PATTERN,
  time: TIME_PATTERN,
  dateTime: `${DATE_PATTERN} ${TIME_PATTERN}`,
  dateRequest: DATE_REQUEST_PATTERN,
};

export const stringToDate = (date?: string) => (date ? dayjs(date) : null);

export const formatDateToString = (
  date: string | dayjs.Dayjs | null,
  format: keyof typeof DateFormats
) => dayjs(date).format(DateFormats[format]);
