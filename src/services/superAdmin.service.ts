import { Endpoint } from "../utils/api/endpoints.api";
import { ApiFetchRequestOptions, BaseApiResponse, IUser } from "../utils/types";
import ApiProvider from "./abstract-api.provider";

export class SuperAdminService extends ApiProvider {
  public async inviteUser(
    options: ApiFetchRequestOptions = {}
  ): Promise<BaseApiResponse<IUser>> {
    return this.callApi(Endpoint.superAdmin["invite-user"], options);
  }
}

export default new SuperAdminService();
