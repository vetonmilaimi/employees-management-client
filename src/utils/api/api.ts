// import { AuthSliceReducers } from "../store/slices/auth.slice";
import { UserService } from "../../services/user.service";
import { AuthSliceReducers } from "../../store/slices/auth.slice";
import { store } from "../../store/store";
import {
  ApiFetchFetchOptionsInit,
  ApiFetchRequestOptions,
  ApiFetchResource,
  BaseApiResponse,
  UserSession,
} from "../types";

class Api {
  private buildQuery(query: Record<string, unknown>) {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(query)) {
      searchParams.append(key, String(value));
    }
    return `?${searchParams.toString()}`;
  }

  public async call<T>(
    resource: ApiFetchResource,
    options: ApiFetchRequestOptions = {} as ApiFetchRequestOptions
  ): Promise<T> {
    const {
      data,
      params,
      query,
      headers,
      check_access_token_expired = true,
    } = options;

    const state = store.getState();
    const authState = state.auth;

    const isFormData = data instanceof FormData;

    const ourHeaders = new Headers({
      access_token: authState?.value?.session?.access_token,
      ...(headers ?? {}),
    });

    if (!isFormData) {
      ourHeaders.append("Content-Type", "application/json");
    }

    const fetchOptions: ApiFetchFetchOptionsInit = {
      method: resource.method,
      url: params ? `${resource.url}/${params.join("/")}` : resource.url,
      body: data instanceof FormData ? data : JSON.stringify(data),
      headers: ourHeaders,
    };

    if (query) fetchOptions.url += this.buildQuery(query);

    const response = await fetch(fetchOptions.url, fetchOptions);
    const jsonResponse = await response.json();

    if (
      check_access_token_expired &&
      UserService.accessTokenExpired(jsonResponse)
    ) {
      const oauthResponse = await new UserService().reGenerateTokens({
        check_access_token_expired: false,
        headers: { refresh_token: authState.value.session.refresh_token },
      });
      if (UserService.accessTokenHasBeenRefreshed(oauthResponse)) {
        store.dispatch(
          AuthSliceReducers.reGenerateAccessToken(
            (oauthResponse as BaseApiResponse<UserSession>).message
          )
        );
        return await this.call(resource, {
          ...options,
          check_access_token_expired: false,
        });
      }
    }

    if (response?.status === 401) {
      store.dispatch(AuthSliceReducers.logout());
      throw await jsonResponse;
    }

    if (!response.ok) throw await jsonResponse;
    return jsonResponse;
  }
}

const apiInstance = new Api();
export default apiInstance;
