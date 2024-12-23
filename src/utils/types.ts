import { USER_ROLES } from "./constants";

export interface ApiFetchRequestOptions {
  data?: object | Record<string, unknown> | FormData;
  params?: string[];
  query?: Record<string, unknown>;
  headers?: HeadersInit;
  check_access_token_expired?: boolean;
}

export interface ApiFetchResource {
  url: string;
  method: string;
}

export interface ApiFetchFetchOptionsInit extends ApiFetchResource {
  body?: BodyInit | null;
  headers?: HeadersInit;
}

export interface BaseApiResponse<T> {
  error: boolean;
  message: T;
}

export interface ErrorResponse {
  error: boolean;
  name: string;
  message: string;
  statusCode: number;
  details: object;
}

export enum MODAL_SIZES {
  SMALL = "sm",
  MEDIUM = "md",
  LARGE = "lg",
}

export interface IGlobalSlice {
  modal: {
    visible: boolean;
    component: JSX.Element | null;
    size: MODAL_SIZES;
  };
}

export interface UserSession {
  entityId: string;
  userId: string;
  accessToken: string;
  refreshToken: string;
  accessTokenExp: number;
  refreshTokenExp: number;
  userRole: USER_ROLES;
}

export interface AuthUserSlice {
  user: {
    _id: string;
    email: string;
    role: USER_ROLES;
  };
  session: {
    userId: string;
    accessToken: string;
    refreshToken: string;
  };
}
export interface IUser {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: USER_ROLES;
  activated: boolean;
  activateToken?: string;
}

export interface IOrganization {
  _id: string;
  name: string;
  description: string;
  users: IUser[];
}

export interface IMainHeaderItem {
  key: string;
  icon: JSX.Element;
  label: string;
  onClick: () => void;
}

export interface IProject {
  _id: string;
  name: string;
  description?: string;
  organization: string;
}

export enum PageTabButtonTypes {
  BUTTON = "button",
  LINK = "link",
}

export type PageTabItems = {
  label: string;
  onClick: () => void;
  // By default, the type is a button
  type?: PageTabButtonTypes;
};

export interface IJobEvent {
  _id: string;
  title: string;
  project: string;
  manager: string;
  description?: string;
  employees?: string[];
  start?: Date;
  end?: Date;
}
