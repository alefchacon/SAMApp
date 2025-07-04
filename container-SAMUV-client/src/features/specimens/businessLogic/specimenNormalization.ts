import { ENature } from "@/stores/nature";
import { ESex } from "@/features/specimens/domain/enum/ESex";

function isENature(value: string): value is ENature {
  return (Object.values(ENature) as string[]).includes(value);
}

function isESex(value: string): value is ESex {
  return (Object.values(ESex) as string[]).includes(value);
}

function isEnumValue<T extends Record<string, string>>(
  enumObj: T,
  value: string
): value is T[keyof T] {
  return Object.values(enumObj).includes(value);
}

export function normalizeNature(nature: string) {
  if (isENature(nature)) {
    return nature;
  }

  /**
   * The collection uses both `EA` and `E/A` for the
   * same nature: use E/A only.
   */
  if (nature === "EA") {
    return ENature.EA;
  }

  const normalizedNature = removeSlash(nature);
  if (isENature(normalizedNature)) {
    return normalizedNature;
  }

  return ENature.ND;
}

/*
export function normalizeCatalogue(
  valueToNormalize = "",
  catalogue = ESex,
  defaultValue = "ND"
) {
  const upperCaseValue = valueToNormalize.toUpperCase();
  const valid = Object.values(catalogue).includes(upperCaseValue);

  if (valid) {
    return upperCaseValue;
  }
  return defaultValue;
}*/

export function normalizeCatalogue<T extends Record<string, string>>(
  valueToNormalize = "",
  catalogue: T,
  defaultValue = "ND"
) {
  const upperCaseValue = valueToNormalize.toUpperCase();

  if (isEnumValue(catalogue, upperCaseValue)) {
    return upperCaseValue;
  }
  return defaultValue;
}

function removeSlash(nature: string): string {
  const regex = new RegExp("/", "g");
  return nature.replace(regex, "");
}
