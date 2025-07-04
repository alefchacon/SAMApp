// DEV ONLY: refactor to ENUM

const DATE_TYPES = Object.freeze({
  MONTH: "month",
  YEAR: "year",
});

export enum DateTypes {
  MONTH = "month",
  YEAR = "year",
}

export default DATE_TYPES;
