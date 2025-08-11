import User, { defaultUser } from "./User";

export interface ITechnicalPerson {
  fullname: string;
  position: string;
  user: User;
}

export class TechnicalPerson implements ITechnicalPerson {
  fullname: string;
  position: string;
  user: User;
  constructor(data: ITechnicalPerson) {
    this.fullname = data.fullname;
    this.position = data.position;
    this.user = data.user;
  }

  get serialized() {
    return new TechnicalPerson({
      fullname: `${this.user.first_name} ${this.user.last_name}`,
      position: this.position,
      user: this.user,
    });
  }
}

export const defaultTecnicalPerson = new TechnicalPerson({
  fullname: "",
  position: "",
  user: defaultUser,
});
