import moment from "moment";

export const getOrDefaultString = (value: any) =>
  Boolean(value?.trim()) ? value : "ND";

export const getOrDefaultNumber = (value: any, defaultValue: number = 0) => {
  if (!Boolean(value)) {
    return defaultValue;
  }

  const isEmptyString = typeof value === "string" && !Boolean(value.trim());
  if (isEmptyString) {
    return defaultValue;
  }

  const parsedValue = Number(value);
  if (Boolean(parsedValue)) {
    return parsedValue;
  }

  return value;
};

export const getOrDefaultDate = (
  data = { year: 1999, month: 1, day: 1 },
  defaultDate = moment().format("YYYY-MM-DD")
) => {
  const dateKeys = ["year", "month", "day"] as const;

  const dataHasDateKeys = dateKeys.every((dateKey) =>
    data.hasOwnProperty(dateKey)
  );

  if (!dataHasDateKeys) {
    return defaultDate;
  }

  const allDateKeysAreNumbers = dateKeys.every((dateKey) =>
    Boolean(Number(data[dateKey]))
  );

  if (!allDateKeysAreNumbers) {
    return defaultDate;
  }

  const parsedDate = moment()
    .year(Number(data.year))
    // months are zero indexed.
    // december is 11 instead of 12
    .month(Number(data.month) - 1)
    .date(Number(data.day));

  return parsedDate.format("YYYY-MM-DD");
};
