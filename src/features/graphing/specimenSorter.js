import DATE_TYPES from "./dateTypes";
import moment from "moment";
import { getRandomColor } from "./Colors";

function compareDates(spec1, spec2) {
  const date1 = moment(spec1.colection_date, "YYYY-MM-DD");
  const date2 = moment(spec2.colection_date, "YYYY-MM-DD");

  if (date1.isBefore(date2)) {
    return -1;
  }
  if (date2.isBefore(date1)) {
    return 1;
  }
  return 0;
}

export const sortByDate = async (
  specimens,
  specimenAttribute = "colection_date",
  dateType = DATE_TYPES.MONTH
) => {
  const sorted = specimens.sort(compareDates);
  const dates = sorted.map((specimen) =>
    moment(specimen[specimenAttribute])[dateType]()
  );

  const uniqueValues = Array.from(new Set(dates).values());

  const valueMap = {};
  for (let i = 0; i < uniqueValues.length; i++) {
    valueMap[uniqueValues[i]] = 0;
    for (let j = 0; j < specimens.length; j++) {
      const attributeToSort = moment(specimens[j][specimenAttribute]);
      if (attributeToSort[dateType]() === uniqueValues[i]) {
        valueMap[uniqueValues[i]] += 1;
      }
    }
  }

  const graphData = Object.entries(valueMap).map((pair) => {
    return {
      name:
        dateType === DATE_TYPES.MONTH
          ? moment()[dateType](pair[0]).format("MMMM")
          : moment()[dateType](pair[0]).year(),
      value: pair[1],
      opacity: 1,
      fill: getRandomColor(),
    };
  });

  return graphData;
};