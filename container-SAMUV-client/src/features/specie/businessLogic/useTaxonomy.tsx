import { useState, useCallback } from "react";
import useApi from "../../../dataAccess/useApi";
import { ORDENS_URL, TAXONOMY_RANKS_URL } from "./specieUrl";
import { IRank } from "../domain/Rank";

export const useTaxonomy = () => {
  const { apiWrapper } = useApi();

  const getRanksPreview = async (): Promise<{ [key: string]: IRank[] }> => {
    const result = await apiWrapper.get<{ [key: string]: IRank[] }>({
      url: TAXONOMY_RANKS_URL,
    });
    if (result.success && result.data) {
      return result.data;
    }
    return {};
  };

  return {
    getRanksPreview,
  };
};
