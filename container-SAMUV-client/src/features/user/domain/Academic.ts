import User, { defaultUser } from "./User";

export interface IAcademic {
  names?: string;
  father_last_name?: string;
  mother_last_name?: string;
  state?: string;
  major?: string;
  city?: string;
  college?: string;
  position?: string;
  degree?: string;
  user: User;
}

export class Academic implements IAcademic {
  names?: string;
  father_last_name?: string;
  mother_last_name?: string;
  state?: string;
  major?: string;
  city?: string;
  college?: string;
  position?: string;
  degree?: string;
  user: User;

  constructor(data: IAcademic) {
    this.names = data.names;
    this.father_last_name = data.father_last_name;
    this.mother_last_name = data.mother_last_name;
    this.state = data.state;
    this.major = "";
    this.city = "";
    this.college = "";
    this.position = "";
    this.degree = "";
    this.user = data.user ? new User(data.user) : defaultUser;
  }

  get fullName() {
    return `${this.names} ${this.father_last_name} ${this.mother_last_name}`;
  }
}

export const defaultAcademic: IAcademic = {
  position: "",
  names: "",
  father_last_name: "",
  mother_last_name: "",
  state: "",
  major: "major",
  city: "",
  college: "",
  degree: "",
  user: defaultUser,
};
