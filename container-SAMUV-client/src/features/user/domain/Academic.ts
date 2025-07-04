import User from "./User";

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
  user?: User;
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
  user?: User;

  constructor(data: IAcademic = {}) {
    this.names = data.names;
    this.father_last_name = data.father_last_name;
    this.mother_last_name = data.mother_last_name;
    this.state = data.state;
    this.major = "";
    this.city = "";
    this.college = "";
    this.position = "";
    this.degree = "";
    this.user = new User(data?.user);
  }
}
