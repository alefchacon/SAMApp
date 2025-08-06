import User, { defaultUser } from "./User";

export interface ITechnicalPerson {
  fullname: string;
  position: string;
  user: User;
}

export const defaultTecnicalPerson: ITechnicalPerson = {
  fullname: "",
  position: "",
  user: defaultUser,
};
