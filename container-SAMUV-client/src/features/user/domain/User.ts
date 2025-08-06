interface IUser {
  email?: string;
  username?: string;
  password?: string;
  passwordConfirmation?: string;
  first_name?: string;
  last_name?: string;
}

class User implements IUser {
  email = "";
  username = "";
  password = "";
  passwordConfirmation = "";
  first_name = "";
  last_name = "";

  constructor(data: IUser = {}) {
    Object.assign(this, data);
  }
}

export default User;

export const defaultUser = new User({
  email: "",
  username: "",
  password: "",
  passwordConfirmation: "",
  first_name: "",
  last_name: "",
});
