import CredentialKeys from "@/stores/CredentialsKeys";
import { IProfile } from "./Profile";

export interface ISession {
  [CredentialKeys.PROFILE]?: IProfile;
  [CredentialKeys.TOKEN_ACCESS]?: string;
  [CredentialKeys.TOKEN_REFRESH]: string | null;
}
