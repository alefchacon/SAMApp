import moment from "moment"

class Specimen {
    colectionDate: moment.Moment; 
    colectionDate_month = () => {
      return this.colectionDate.month();
    };
    colectionDate_monthName = () => {
      return this.colectionDate.format("MMMM");
    };
    colectionDate_year = () => {
      return this.colectionDate.year();
    };
    


    constructor(colectionDate: string){

      const incomingColectionDate =  moment(colectionDate, "YYYY-MM-DD")

      this.colectionDate = incomingColectionDate;
    }


}

enum AttributeType {
  COLECTION_DATE_MONTH,
}