import User from "../../user/domain/user";

class AccessRequest {
    constructor(
      data,
    ){
        this.id = data?.id || "";
        this.orcid = data?.orcid || "";
        this.about = data?.about || "";
        
        this.academic = {
            names: data?.academic?.names || "",
            father_last_name: data?.academic?.father_last_name || "",
            mother_last_name: data?.academic?.mother_last_name || "",
            state: data?.academic?.state || "",
            
            // ignored at stakeholder's request
            major: data?.academic?.major || "NINGUNO", 
            
            city: data?.academic?.city || "",
            college: data?.academic?.college || "",
            position: data?.academic?.position || "",
            degree: data?.academic?.degree || "",    
            user: new User(data?.academic?.user)
        }
    
    }
  }
  
  export default AccessRequest;