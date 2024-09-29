import { Endpoint } from "../utils/api/endpoints.api";
import { ApiFetchRequestOptions, BaseApiResponse, IUser } from "../utils/types";
import ApiProvider from "./abstract-api.provider";

export class AdminService extends ApiProvider {
  public async inviteUser(
    options: ApiFetchRequestOptions = {}
  ): Promise<BaseApiResponse<IUser>> {
    return this.callApi(Endpoint.admin["invite-user"], options);
  }

  public async listUsers(
    options: ApiFetchRequestOptions = {}
  ): Promise<BaseApiResponse<IUser[]>> {
    return this.callApi(Endpoint.admin["list-users"], options);
  }

  public async deleteUser(
    options: ApiFetchRequestOptions = {}
  ): Promise<BaseApiResponse<object>> {
    return this.callApi(Endpoint.admin["delete-user"], options);
  }
}

export default new AdminService();
