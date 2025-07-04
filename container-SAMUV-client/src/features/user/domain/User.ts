interface IUser {
  email?: string;
  username?: string;
  password?: string;
  passwordConfirmation?: string;
}

class User implements IUser {
  email = "";
  username = "";
  password = "";
  passwordConfirmation = "";

  constructor(data: IUser = {}) {
    Object.assign(this, data);
  }
}

export default User;
