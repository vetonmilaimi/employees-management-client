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
  superAdmin: {
    "invite-user": {
      url: `${API_URL}/v1/super-admin/user-invite`,
      method: "POST",
    },
    "list-users": {
      url: `${API_URL}/v1/super-admin/list-users`,
      method: "GET",
    },
    "delete-user": {
      url: `${API_URL}/v1/super-admin/user-delete`,
      method: "DELETE",
    },
  },
};
