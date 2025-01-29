class User {
    constructor(
      data,
    ){
        this.email = data?.email || "";
        this.username = data?.username || "";
        this.password = data?.password || "";
        // FRONTEND ONLY;
        this.passwordConfirmation = data?.passwordConfirmation || "";
        
    }
  }
  
  export default User;