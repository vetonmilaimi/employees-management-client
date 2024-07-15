import { USER_ROLES } from "./constants";

export interface AuthUserSlice {
  user: {
    _id: string;
    email: string;
    userRole: USER_ROLES;
  };
  session: {
    user_id: string;
    access_token: string;
    refresh_token: string;
  };
}
