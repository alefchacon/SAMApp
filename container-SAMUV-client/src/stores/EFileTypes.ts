const csv =
  ".csv,text/csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel";
const img =
  ".jpg,.jpeg,.png,.gif,.bmp,.webp,image/jpeg,image/png,image/gif,image/bmp,image/webp";

export enum EFileTypes {
  CSV = csv,
  XLSX = csv,
  IMG = img,
}
