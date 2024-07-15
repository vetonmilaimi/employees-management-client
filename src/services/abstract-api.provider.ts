import Api from "../utils/api/api";
import { ApiFetchRequestOptions, ApiFetchResource } from "../utils/types";

abstract class ApiProvider {
  protected callApi<T>(
    endpoint: ApiFetchResource,
    options: ApiFetchRequestOptions = {}
  ): Promise<T> {
    return Api.call(endpoint, options);
  }
}

export default ApiProvider;
