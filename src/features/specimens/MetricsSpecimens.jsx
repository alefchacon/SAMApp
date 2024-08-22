import { useState, useEffect } from "react";
import moment from "moment";

import Multigraph from "../graphing/Multigraph";
import testData from "../graphing/TestData";

import { getRandomColor } from "../graphing/Colors";

export default function MetricsSpecimens({ specimens }) {
  const [graphData, setGraphData] = useState({
    specimensPerMonth: [],
    specimensPerYear: [],
  });

  useEffect(() => {
    sortData();
  }, []);

  useEffect(() => {
    sortData();
  }, [specimens]);

  function sortData() {
    sortByMonth();
  }

  useEffect(() => {
    console.log(graphData.specimensPerMonth);
  }, [graphData.specimensPerMonth]);

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

  const sortByMonth = () => {
    const sorted = specimens.sort(compareDates);
    const dates = sorted.map((specimen) =>
      moment(specimen["colection_date"]).month()
    );

    const uniqueMonths = Array.from(new Set(dates).values());

    const valueMap = {};
    for (let i = 0; i < uniqueMonths.length; i++) {
      valueMap[uniqueMonths[i]] = 0;
      for (let j = 0; j < specimens.length; j++) {
        const colection_date = moment(specimens[j].colection_date);
        if (colection_date.month() === uniqueMonths[i]) {
          valueMap[uniqueMonths[i]] += 1;
        }
      }
    }

    const graphData = Object.entries(valueMap).map((pair) => {
      return {
        name: moment().month(pair[0]).format("MMMM"),
        value: pair[1],
        opacity: 1,
        fill: getRandomColor(),
      };
    });

    setGraphData((prevSpecimens) => ({
      ...prevSpecimens,
      specimensPerMonth: graphData,
    }));
  };

  return (
    <div className="p-1rem gap-1rem h-100 multigraph-wrapper">
      <Multigraph
        graphTitle="Especímenes recolectados por mes"
        data={graphData.specimensPerMonth}
      />
      <Multigraph
        graphTitle="Especímenes recolectados por mes"
        data={graphData.specimensPerYear}
      />
      <Multigraph
        graphTitle="Especímenes recolectados por mes"
        data={testData}
      />
      <Multigraph
        graphTitle="Especímenes recolectados por mes"
        data={testData}
      />
      <Multigraph
        graphTitle="Especímenes recolectados por mes"
        data={testData}
      />
    </div>
  );
}
