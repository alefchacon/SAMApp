import { serverUrl } from "../../../routing/backendRoutes";
class Photosheet {
    constructor(
      data,
    ){
        this.id = data?.id || "";
        this.description = data?.description || "";
        this.sheet = this.parseSheet(data?.sheet)
    }

    parseSheet(sheet){
        if (sheet instanceof File) {
            return URL.createObjectURL(sheet)
        } else {
            return serverUrl.concat(sheet);
        }
    }
  }
  
  export default Photosheet;