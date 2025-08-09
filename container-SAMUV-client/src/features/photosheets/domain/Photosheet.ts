import { pathPrefix, serverUrl } from "../../../routing/BackendRoutes";
export interface IPhotosheet {
  id: number;
  description: string;
  sheet: File | string;
}

export class Photosheet implements IPhotosheet {
  id: number;
  description: string;
  sheet: File | string;

  constructor(data: IPhotosheet) {
    this.id = data?.id || 0;
    this.description = data?.description || "";
    this.sheet = this.parseSheet(data?.sheet);
  }
  parseSheet(sheet: File | string) {
    if (sheet instanceof File) {
      return URL.createObjectURL(sheet);
    } else {
      return serverUrl.concat(`${pathPrefix}${sheet}`);
    }
  }
}

export const defaultPhotosheet: IPhotosheet = {
  id: 0,
  description: "description",
  sheet: "src/assets/images/0.webp",
};
