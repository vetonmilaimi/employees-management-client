export interface AuthUserSlice {
  user: {
    _id: string;
    email: string;
  };
  session: {
    user_id: string;
    access_token: string;
    refresh_token: string;
  };
}
