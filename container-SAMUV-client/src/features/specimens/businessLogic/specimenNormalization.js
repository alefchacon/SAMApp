import NATURE from "../../../stores/nature"
import SEX from "../../../stores/sex";
export function normalizeNature(nature = ""){
    const validNature = 
        Object.values(NATURE).includes(nature);
   
    if (validNature){
        return nature;
    }

    if (nature === "EA"){
        return NATURE.EA;
    }

    const normalizedNature = removeSlash(nature);
    const validNormalizedNature = 
        Object.values(NATURE).includes(normalizedNature);
    if (validNormalizedNature){
        return normalizedNature;
    }
    return NATURE.ND;
}

export function normalizeCatalogue(
    valueToNormalize = "",
    catalogue = SEX,
    defaultValue = "ND"
){
    const upperCaseValue = valueToNormalize.toUpperCase()
    const valid = 
        Object.values(catalogue).includes(upperCaseValue);
   
    if (valid){
        return upperCaseValue;
    }
    return defaultValue;
}

function removeSlash(nature){
    const regex = new RegExp("/", 'g');
    return nature.replace(regex, ''); 
}