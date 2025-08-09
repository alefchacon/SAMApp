import {
  IAcademic,
  Academic,
  defaultAcademic,
} from "@/features/user/domain/Academic";

export interface IAccessRequest {
  id?: number;
  orcid?: string;
  about?: string;
  academic?: IAcademic;
}

export class AccessRequest implements IAccessRequest {
  id?: number;
  orcid?: string;
  about?: string;
  academic?: Academic;

  constructor(data: IAccessRequest) {
    this.id = data?.id || -1;
    this.orcid = data?.orcid || "";
    this.about = data?.about || "";
    this.academic = new Academic(data.academic || defaultAcademic);
  }
}

export const defaultAccessRequest: IAccessRequest = {
  about: "",
  academic: defaultAcademic,
  id: 0,
  orcid: "",
};
