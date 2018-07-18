export const API_ENDPOINT = process.env.REACT_APP_KAZNET_ENDPOINT;
export const API_TOKEN = process.env.REACT_APP_API_TOKEN;
export const ONA_WEBSITE = process.env.REACT_APP_ONA_WEBSITE;
export const ONA_USERNAME = process.env.REACT_APP_ONA_USERNAME;
export const TASK_ACTIVE = "a";
export const TASK_DEACTIVATED = "b";
export const TASK_EXPIRED = "c";
export const TASK_DRAFT = "d";
export const TASK_SCHEDULED = "s";
export const TASK_ARCHIVED = "e";
export const TASK_STATUSES = [
  TASK_ACTIVE,
  TASK_DEACTIVATED,
  TASK_EXPIRED,
  TASK_DRAFT,
  TASK_SCHEDULED,
  TASK_ARCHIVED
];
