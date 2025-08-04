import Search from "@/app/routes/app/Search";
import React from "react";
import { useSearchParams, Navigate } from "react-router-dom";
import TaxonomyBuilder from "@/app/routes/TaxonomyBuilder";
import SpecieOrdens from "@/app/routes/SpecieOrdens";
import SpecieDashboard from "@/app/routes/app/SpecieDashboard";
import {
  FrontendSearchParams,
  FrontendSpecieParams,
} from "@/routing/FrontendRoutes";
import { Profile } from "@/features/auth/domain/Profile";

interface ISpecieRouterParams {
  profile: Profile;
}
export default function SpecieRouter({ profile }: ISpecieRouterParams) {
  const [searchParams] = useSearchParams();

  if (profile.isTechnicalPerson()) {
    return <SpecieDashboard role={profile.role} onSpecieSelection={() => {}} />;
  }

  const searchParamEnum = Object.values(FrontendSpecieParams);
  let query;

  if (searchParams.has(FrontendSearchParams.SEARCH_QUERY)) {
    query = searchParams.get(FrontendSearchParams.SEARCH_QUERY) || "";
    return <Search query={query} />;
  }

  const currentParams = Array.from(searchParams.keys());
  const specieParam = searchParamEnum.find((param) =>
    currentParams.includes(param)
  );

  if (!specieParam) {
    return <SpecieOrdens />;
  }

  query = searchParams.get(specieParam) || "";
  return <TaxonomyBuilder taxonName={query} rankName={specieParam} />;
}
