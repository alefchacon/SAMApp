import { IAcademic, Academic } from "@/features/user/domain/academic";

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
    this.academic = new Academic(data.academic);
  }
}
