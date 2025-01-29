import DATE_TYPES from "../stores/dateTypes";
import moment from "moment";
import { getRandomColor } from "../stores/colors";
import { groupBy } from "lodash";

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


const countByDate = (specimens, uniqueDates, dateType, specimenAttribute) => {
  const dateMap = {};
  for (let i = 0; i < uniqueDates.length; i++) {
    dateMap[uniqueDates[i]] = 0;
    for (let j = 0; j < specimens.length; j++) {
      const attributeToSort = moment(specimens[j][specimenAttribute]);
      if (attributeToSort[dateType]() === uniqueDates[i]) {
        dateMap[uniqueDates[i]] += 1;
      }
    }
  }
  return dateMap
} 

export const sortByDate = async (
  specimens,
  specimenAttribute = "colection_date",
  dateType = DATE_TYPES.MONTH
) => {
  const sorted = specimens.sort(compareDates);
  const allDates = sorted.map((specimen) =>
    moment(specimen[specimenAttribute])[dateType]()
  );

  const uniqueDates = Array.from(new Set(allDates).values());

  const specimenAmountPerDate = countByDate(specimens, uniqueDates, dateType, specimenAttribute);
  
  const graphData = Object.entries(specimenAmountPerDate).map((pair) => {
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