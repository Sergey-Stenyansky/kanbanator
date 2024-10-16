import dayjs, { Dayjs } from "dayjs";

export enum DateFormat {
  date = "DD MMM YYYY",
  shortDateISO = "YYYY-MM-DD",
  fullDateISO = "YYYY-MM-DD HH:mm:ss",
  shortDate = "DD.MM.YYYY",
}

export default function formatDate(
  date: Dayjs | Date | string | null | undefined,
  format: DateFormat | string,
  fallbackValue = ""
) {
  const parsed = dayjs(date);
  if (!parsed.isValid()) return fallbackValue;
  return parsed.format(format);
}
