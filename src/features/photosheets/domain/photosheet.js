import { SERVER_URL } from "../../../config/env";
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
            return SERVER_URL.concat(sheet);
        }
    }
  }
  
  export default Photosheet;