import { UserRoles } from "@/stores/EUserRoles";

export interface IProfile {
  id: number;
  username: string;
  email: string;
  fullname: string;
  role: UserRoles;
}

export class Profile implements IProfile {
  id: number = -1;
  username: string = "";
  email: string = "";
  fullname: string = "";
  role: UserRoles = UserRoles.VISITOR;

  constructor(data: IProfile) {
    this.id = data.id;
    this.username = data.username;
    this.email = data.email;
    this.fullname = data.fullname;
    this.role = data.role;
  }

  isVisitor = () => this.role === UserRoles.VISITOR;
  isTechnicalPerson = () => this.role === UserRoles.TECHNICAL_PERSON;
  isAcademic = () => this.role === UserRoles.ACADEMIC;
}

export const visitorProfile = new Profile({
  id: -1,
  fullname: "Visitor",
  email: "",
  username: "Visitor",
  role: UserRoles.VISITOR,
});
