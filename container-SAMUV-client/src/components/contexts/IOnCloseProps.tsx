export default interface IOnCloseParams {
  event?: any | null;
  reason?: string;
}

export const defaultCloseParams: IOnCloseParams = {
  event: null,
  reason: "",
};
