const flattenObject = (nestedObject, parentKey = "", result = {}, includeParentKey = false) => {
  for (let key in nestedObject) {
    if (nestedObject.hasOwnProperty(key)) {
      const newKey = (parentKey && includeParentKey) ? `${parentKey}.${key}` : key;

      if (
        typeof nestedObject[key] === "object" &&
        nestedObject[key] !== null
      ) {
        flattenObject(nestedObject[key], newKey, result, includeParentKey);
      } else {
        result[newKey] = nestedObject[key];
      }
    }
  }
  return result;
};

export default flattenObject