import { Endpoint } from "../utils/api/endpoints.api";
import {
  ApiFetchRequestOptions,
  BaseApiResponse,
  IOrganization,
} from "../utils/types";
import ApiProvider from "./abstract-api.provider";

export class OrganizationService extends ApiProvider {
  public async about(
    options: ApiFetchRequestOptions = {}
  ): Promise<BaseApiResponse<IOrganization>> {
    return this.callApi(Endpoint.organization.about, options);
  }

  public async add(
    options: ApiFetchRequestOptions = {}
  ): Promise<BaseApiResponse<IOrganization>> {
    return this.callApi(Endpoint.organization.add, options);
  }

  public async update(
    options: ApiFetchRequestOptions = {}
  ): Promise<BaseApiResponse<IOrganization>> {
    return this.callApi(Endpoint.organization.update, options);
  }
}

export default new OrganizationService();
