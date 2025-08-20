export enum USER_ROLES {
  ADMIN = "admin",
  MANAGER = "manager",
  USER = "user",
}

export enum JOB_EVENT_STATUS {
  TODO = 'todo',
  IN_PROGRESS = 'in progress',
  ON_REVIEW = 'on review',
  DONE = 'done',
}

export const API_URL = import.meta.env.VITE_API_URL;
export const APP_URL = import.meta.env.VITE_APP_URL;
