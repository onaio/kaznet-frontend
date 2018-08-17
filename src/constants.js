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
export const DEACTIVATED = "Deactivated";
export const EXPIRED = "Expired";
export const SCHEDULED = "Scheduled";
export const ARCHIVED = "Archived";
export const ESTIMATED_TIME = "00:15";
export const TASKDATE_FORMAT = "YYYY-MM-DD";
export const TASKLOCATIONSTART = "09:00";
export const TASKLOCATIONEND = "17:00";
export const TASKLOCATIONTIMINGRULE = "FREQ=DAILY;INTERVAL=1;COUNT=1";

export const TASK_STATUSES = [
  TASK_ACTIVE,
  TASK_DEACTIVATED,
  TASK_EXPIRED,
  TASK_DRAFT,
  TASK_SCHEDULED,
  TASK_ARCHIVED
];
