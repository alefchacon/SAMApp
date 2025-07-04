import { EContriubutorRoles } from "@/stores/EContributorRoles";

export interface IContributorSpecimen {
  id?: number;
  contributor: number; // this is the contributor's id. This is the name in the backend
  contributor_role: EContriubutorRoles;
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

  constructor(data: IContributor, role = null) {
    this.id = data.id;
    this.code =
      data?.code ||
      (role === EContriubutorRoles.COLECTOR
        ? data?.colector
        : data?.preparator) ||
      "ND";
    this.name = data?.name;
  }
}

export const defaultContributor: Contributor = {};

export default Contributor;
