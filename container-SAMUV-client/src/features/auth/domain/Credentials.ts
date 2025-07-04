export interface ICredentials {
  username?: string;
  password: string;
  old_password?: string;
  passwordConfirmation?: string;
}

class Credentials implements ICredentials {
  username?: string;
  password: string;
  old_password?: string;
  passwordConfirmation?: string;

  constructor(data: ICredentials) {
    this.old_password = data?.old_password || "";
    this.password = data?.password || "";
    this.passwordConfirmation = data?.passwordConfirmation || "";
  }

  get passwordResetFields() {
    return {
      new_password: this.password,
      old_password: this.old_password,
    };
  }
}

export default Credentials;
