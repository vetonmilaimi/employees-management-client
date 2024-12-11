import { Endpoint } from "../utils/api/endpoints.api";
import {
  ApiFetchRequestOptions,
  BaseApiResponse,
  IOrganization,
  IUser,
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

  public async addEmployee(
    options: ApiFetchRequestOptions = {}
  ): Promise<BaseApiResponse<IOrganization>> {
    return this.callApi(Endpoint.organization["add-employee"], options);
  }

  public async listEmployees(
    options: ApiFetchRequestOptions = {}
  ): Promise<BaseApiResponse<IUser[]>> {
    return this.callApi(Endpoint.organization["list-employees"], options);
  }

  public async deleteEmployee(
    options: ApiFetchRequestOptions = {}
  ): Promise<BaseApiResponse<boolean>> {
    return this.callApi(Endpoint.organization.delete, options);
  }
}

export default new OrganizationService();
