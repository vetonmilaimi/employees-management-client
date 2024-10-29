import { API_URL } from "../constants";

export const Endpoint = {
  user: {
    auth: {
      login: { url: `${API_URL}/v1/auth/login`, method: "POST" },
      register: { url: `${API_URL}/v1/auth/register`, method: "POST" },
      logout: { url: `${API_URL}/v1/auth/logout`, method: "GET" },
      activate: { url: `${API_URL}/v1/auth/activate`, method: "POST" },
      regenerateTokens: {
        url: `${API_URL}/v1/auth/regenerate-tokens`,
        method: "GET",
      },
    },
  },
  admin: {
    "invite-user": {
      url: `${API_URL}/v1/admin/user-invite`,
      method: "POST",
    },
    "list-users": {
      url: `${API_URL}/v1/admin/list-users`,
      method: "GET",
    },
    "delete-user": {
      url: `${API_URL}/v1/admin/user-delete`,
      method: "DELETE",
    },
  },
  organization: {
    about: {
      url: `${API_URL}/v1/organization/about`,
      method: "GET",
    },
    add: {
      url: `${API_URL}/v1/organization/create`,
      method: "POST",
    },
    update: {
      url: `${API_URL}/v1/organization/update`,
      method: "POST",
    },
    "add-employee": {
      url: `${API_URL}/v1/organization/add-employee`,
      method: "POST",
    },
    "list-employees": {
      url: `${API_URL}/v1/organization/list-employees`,
      method: "GET",
    },
  },
  projects: {
    list: {
      url: `${API_URL}/v1/project/list`,
      method: "GET",
    },
  },
};
