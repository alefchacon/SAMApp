import { EContributorRoles } from "@/stores/EContributorRoles";

export interface IContributorSpecimen {
  id?: number;
  code?: string;
  name?: string;
  contributor?: number; // this is the contributor's id. This is the name in the backend
  contributor_role?: EContributorRoles;
  contributor_role_id?: number;
  contributor_id?: number;
}

export interface IContributor {
  id?: number;
  code?: string;
  name?: string;
  colector?: string;
  preparator?: string;
}

export class Contributor implements IContributor {
  id?: number = -1;
  code?: string = "";
  name?: string = "";

  constructor(data: IContributor, role?: EContributorRoles) {
    this.id = data.id;
    this.code =
      data?.code ||
      (role === EContributorRoles.COLECTOR
        ? data?.colector
        : data?.preparator) ||
      "ND";
    this.name = data?.name;
  }
}

export const defaultContributor: Contributor = {
  code: "",
  name: "",
};

export default Contributor;
