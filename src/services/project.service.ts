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
}

export default new ProjectService();
