import CONTRIBUTOR_ROLES from "../../../stores/contributorRoles";

class Contributor {
  constructor(
    data,
    role = null
  ){
    if (data?.id){
      this.id = data.id;
    }
    this.code = data?.code || (role === CONTRIBUTOR_ROLES.COLECTOR 
      ? data?.colector 
      : data?.preparator) 
    || "ND";
    this.name = data?.name || "";
    
  }

}

export default Contributor;