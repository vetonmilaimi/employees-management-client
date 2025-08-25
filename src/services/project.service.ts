import { Endpoint } from "../utils/api/endpoints.api";
import {
  ApiFetchRequestOptions,
  BaseApiResponse,
  IProject,
} from "../utils/types";
import ApiProvider from "./abstract-api.provider";

export class ProjectService extends ApiProvider {
  public async list(
    options: ApiFetchRequestOptions = {}
  ): Promise<BaseApiResponse<IProject[]>> {
    return this.callApi(Endpoint.projects.list, options);
  }

  public async add(
    options: ApiFetchRequestOptions = {}
  ): Promise<BaseApiResponse<IProject>> {
    return this.callApi(Endpoint.projects.create, options);
  }

  public async update(
    options: ApiFetchRequestOptions = {}
  ): Promise<BaseApiResponse<IProject>> {
    return this.callApi(Endpoint.projects.update, options);
  }

  public async get(
    options: ApiFetchRequestOptions = {}
  ): Promise<BaseApiResponse<IProject>> {
    return this.callApi(Endpoint.projects.get, options);
  }

  public async delete(
    options: ApiFetchRequestOptions = {}
  ): Promise<BaseApiResponse<boolean>> {
    return this.callApi(Endpoint.projects.delete, options);
  }
}

export default new ProjectService();
