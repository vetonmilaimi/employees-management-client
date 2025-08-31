import { Endpoint } from "../utils/api/endpoints.api";
import {
  ApiFetchRequestOptions,
  BaseApiResponse,
  IJobEvent,
  ITimeOnProject,
} from "../utils/types";
import ApiProvider from "./abstract-api.provider";

export class JobEventService extends ApiProvider {
  public async list(
    options: ApiFetchRequestOptions = {}
  ): Promise<BaseApiResponse<IJobEvent[]>> {
    return this.callApi(Endpoint["job-events"].list, options);
  }

  public async getJobEvent(
    options: ApiFetchRequestOptions = {}
  ): Promise<BaseApiResponse<IJobEvent[]>> {
    return this.callApi(Endpoint["job-events"].get, options);
  }

  public async add(
    options: ApiFetchRequestOptions = {}
  ): Promise<BaseApiResponse<IJobEvent>> {
    return this.callApi(Endpoint["job-events"].add, options);
  }

  public async update(
    options: ApiFetchRequestOptions = {}
  ): Promise<BaseApiResponse<IJobEvent>> {
    return this.callApi(Endpoint["job-events"].update, options);
  }

  public async delete(
    options: ApiFetchRequestOptions = {}
  ): Promise<BaseApiResponse<boolean>> {
    return this.callApi(Endpoint["job-events"].delete, options);
  }

  public async getTimeWorkOnProject(
    options: ApiFetchRequestOptions = {}
  ): Promise<BaseApiResponse<ITimeOnProject>> {
    return this.callApi(Endpoint["job-events"]["time-on-project"], options);
  }

}

export default new JobEventService();
