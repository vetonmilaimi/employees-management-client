import { Endpoint } from "../utils/api/endpoints.api";
import {
  ApiFetchRequestOptions,
  BaseApiResponse,
  IJobEvent,
} from "../utils/types";
import ApiProvider from "./abstract-api.provider";

export class JobEventService extends ApiProvider {
  public async list(
    options: ApiFetchRequestOptions = {}
  ): Promise<BaseApiResponse<IJobEvent[]>> {
    return this.callApi(Endpoint["job-events"].list, options);
  }

  public async add(
    options: ApiFetchRequestOptions = {}
  ): Promise<BaseApiResponse<IJobEvent>> {
    return this.callApi(Endpoint["job-events"].add, options);
  }
}

export default new JobEventService();
