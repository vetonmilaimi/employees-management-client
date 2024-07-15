import { Endpoint } from "../utils/api/endpoints.api";
import {
  ApiFetchRequestOptions,
  AuthUserSlice,
  BaseApiResponse,
  ErrorResponse,
  UserSession,
} from "../utils/types";
import ApiProvider from "./abstract-api.provider";

export class UserService extends ApiProvider {
  public async login(
    options: ApiFetchRequestOptions = {}
  ): Promise<BaseApiResponse<AuthUserSlice>> {
    return this.callApi(Endpoint.user.auth.login, options);
  }
  public async logout(
    options: ApiFetchRequestOptions = {}
  ): Promise<BaseApiResponse<boolean>> {
    return this.callApi(Endpoint.user.auth.logout, options);
  }

  public async register(
    options: ApiFetchRequestOptions = {}
  ): Promise<BaseApiResponse<string>> {
    return this.callApi(Endpoint.user.auth.register, options);
  }

  public static accessTokenExpired(response: unknown) {
    return (response as ErrorResponse)?.name === "expired-access-token";
  }

  public async reGenerateTokens(options: ApiFetchRequestOptions = {}) {
    try {
      return await this.callApi<BaseApiResponse<UserSession>>(
        Endpoint.user.auth.regenerateTokens,
        options
      );
    } catch (err: unknown) {
      console.error("err while generating new token:", err);
      return err;
    }
  }
  public static accessTokenHasBeenRefreshed(response: unknown) {
    return (response as BaseApiResponse<UserSession>)?.message?.accessToken;
  }
}
