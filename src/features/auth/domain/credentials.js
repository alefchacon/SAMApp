class Credentials{
  constructor(data){
    this.old_password = data?.old_password || ""; 
    this.new_password = data?.new_password || "";
    this.passwordConfirmation = data?.passwordConfirmation || "";
  }
}


export default Credentials;