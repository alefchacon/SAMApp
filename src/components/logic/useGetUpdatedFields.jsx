import { useState, useMemo, useCallback, useEffect } from "react";
import { useFormikContext } from "formik";

export default function useGetUpdatedFields(ignoredFields) {
  const hasFieldChanged = (values, initialValues, fieldName) => {
    const getValue = (obj, path) => {
      return path
        .split(".")
        .reduce((accumulator, part) => accumulator && accumulator[part], obj);
    };

    const compareValues = (value1, value2) => {
      if (typeof value1 !== typeof value2) return true;
      if (typeof value1 !== "object" || value1 === null || value2 === null) {
        return value1 !== value2;
      }
      return Object.keys(value1).some((key) =>
        compareValues(value1[key], value2[key])
      );
    };

    const currentValue = getValue(values, fieldName);
    const initialValue = getValue(initialValues, fieldName);

    return compareValues(currentValue, initialValue);
  };
  const getUpdatedFields = (values, initialValues) => {
    return Object.keys(values).filter((fieldName) =>
      hasFieldChanged(values, initialValues, fieldName)
    );
  };

  return { getUpdatedFields };
}
