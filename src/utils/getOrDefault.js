import moment from "moment";

export const getOrDefaultString = (value) => Boolean(value) ? value : "ND"; 
export const getOrDefaultNumber = (value) => Boolean(value) ? value : 0.0; 
export const getOrDefaultBoolean = (value) => Boolean(value) ? value : "True"; // "True" as that is what the Python/Django API expects.
export const getOrDefaultDate = (preferredDate, defaultDate) => {
  let date = Boolean(preferredDate) ? preferredDate : defaultDate;
  return date;
}