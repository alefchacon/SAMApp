import moment from "moment";

function getRandomString(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export const getSpecimens = async (amount) => {
  let specimens = [];
  for (let i = 0; i < amount; i++){
    specimens.push({
      id: i, //Math.random(1, amount)
      catalog_id: getRandomString(20),
      status: Boolean(Math.random(0, 1)),
      length_total: Math.random(0, 20),
      length_ear: Math.random(0, 20),      
      length_paw: Math.random(0, 20),
      length_tail: Math.random(0, 20),
      class_age: Math.random(0, 20),
      sex: "F",
      weight: Math.random(0, 20),
      number_embryos: Math.random(0, 20),
      colection_code: getRandomString(20),
      colection_date: getRandomDate().format("YYYY-MM-DD"),
      preparation_date: getRandomDate().format("YYYY-MM-DD"),
      hour: moment().format("HH:mm"),
      comment: getRandomString(20),
    });
  }

  return specimens;
}

function getRandomDate(
  start = moment('1980-01-01'), 
  end = moment('2025-12-31')
) {
  const startTimestamp = start.valueOf();
  const endTimestamp = end.valueOf();
  
  const randomTimestamp = startTimestamp + Math.random() * (endTimestamp - startTimestamp);
  
  return moment(randomTimestamp);
}
