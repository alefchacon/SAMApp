import DATE_TYPES, { DateTypes } from "../stores/dateTypes";
import moment from "moment";
import { getRandomColor } from "../stores/colors";
import { groupBy } from "lodash";
import Specimen from "@/features/specimens/domain/model/Specimen";

function compareDates(specimen1: Specimen, specimen2: Specimen) {
  const date1 = moment(specimen1.colection_date, "YYYY-MM-DD");
  const date2 = moment(specimen2.colection_date, "YYYY-MM-DD");

  if (date1.isBefore(date2)) {
    return -1;
  }
  if (date2.isBefore(date1)) {
    return 1;
  }
  return 0;
}

interface ICountByDate {
  specimens: Specimen[];
  uniqueDates: Array<number>;
  dateType: DateTypes;
  specimenAttribute: string;
}
const countByDate = ({
  specimens,
  uniqueDates,
  dateType,
  specimenAttribute,
}: ICountByDate) => {
  const dateMap = new Map<number, number>();
  for (let i = 0; i < uniqueDates.length; i++) {
    dateMap.set(uniqueDates[i], 0);
    //dateMap[uniqueDates[i]] = 0;
    for (let j = 0; j < specimens.length; j++) {
      const attributeToSort = moment(specimens[j][specimenAttribute]);
      if (attributeToSort[dateType]() === uniqueDates[i]) {
        dateMap.set(uniqueDates[i], dateMap.get(uniqueDates[i])! + 1);
      }
    }
  }
  return dateMap;
};

export interface IGraphData {
  name?: string | number;
  value?: any;
  opacity?: number;
  fill?: string;
}
export const sortByDate = async (
  specimens: Specimen[],
  specimenDateAttribute = "colection_date",
  dateType = DateTypes.MONTH
): Promise<IGraphData[]> => {
  const sortedSpecimens = specimens.sort(compareDates);

  const allDates = sortedSpecimens.map((specimen) =>
    moment(specimen[specimenDateAttribute])[dateType]()
  );

  const uniqueDates = Array.from(new Set(allDates).values());

  const specimenAmountPerDate = countByDate({
    specimens,
    uniqueDates,
    dateType,
    specimenAttribute: specimenDateAttribute,
  });

  let graphData: IGraphData[] = [];
  for (const [date, specimenCount] of specimenAmountPerDate) {
    graphData.push({
      name:
        dateType === DATE_TYPES.MONTH
          ? moment()[dateType](date).format("MMMM")
          : moment()[dateType](Number(date)).year(),
      value: specimenCount,
      opacity: 1,
      fill: getRandomColor(),
    });
  }

  return graphData;
};
