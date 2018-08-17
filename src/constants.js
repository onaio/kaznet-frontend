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

export const deactivated = "Deactivated";
export const expired = "Expired";
export const scheduled = "Scheduled";
export const archived = "Archived";
export const estimated_time = "00:15";
export const taskDateFormat = "YYYY-MM-DD";
export const taskLocationStart = "09:00";
export const taskLocationEnd = "17:00";
export const taskLocationTimingRule = "FREQ=DAILY;INTERVAL=1;COUNT=1";

export const TASK_STATUSES = [
  TASK_ACTIVE,
  TASK_DEACTIVATED,
  TASK_EXPIRED,
  TASK_DRAFT,
  TASK_SCHEDULED,
  TASK_ARCHIVED
];
