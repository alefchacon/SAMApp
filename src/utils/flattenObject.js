const flattenObject = (nestedObject, parentKey = "", result = {}) => {
  console.log(parentKey)
  for (let key in nestedObject) {
    if (nestedObject.hasOwnProperty(key)) {
      const newKey = parentKey ? `${key}` : key;

      if (
        typeof nestedObject[key] === "object" &&
        nestedObject[key] !== null
      ) {
        flattenObject(nestedObject[key], newKey, result);
      } else {
        result[newKey] = nestedObject[key];
      }
    }
  }
  return result;
};

export default flattenObject