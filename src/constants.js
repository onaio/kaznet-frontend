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
export const TASK_ALL = "";
export const ALL = "All";
export const ACTIVE = "Active";
export const DEACTIVATED = "Deactivated";
export const EXPIRED = "Expired";
export const SCHEDULED = "Scheduled";
export const ARCHIVED = "Archived";
export const DRAFT = "Draft";
export const ESTIMATED_TIME = "00:15";
export const ESTIMATED_TIME_INT = "15";
export const TASK_DATE_FORMAT = "YYYY-MM-DD";
export const TASK_LOCATION_START = "09:00";
export const TASK_LOCATION_END = "17:00";
export const TASK_LOCATION_TIMING_RULE = "FREQ=DAILY;INTERVAL=1;COUNT=1";
export const TASK_SORT_ATTRIBUTE = "modified";
export const TASK_SORT_FIELD = "-modified";
export const SORT_ASC = "asc";
export const SORT_DESC = "desc";
export const NOT_APPLICABLE = "N/A";
export const BEGINNER = "1";
export const INTERMEDIATE = "2";
export const ADVANCED = "3";
export const EXPERT = "4";
export const ADMIN_ROLE = "1";
export const CONTRIBUTOR_ROLE = "2";
export const SUBMISSION_APPROVED = "a";
export const SUBMISSION_REJECTED = "b";
export const SUBMISSION_UNDER_REVIEW = "c";
export const SUBMISSION_PENDING = "d";
export const USER_SUBMISSION_TARGET = 10;
export const ASYNC_SEARCH_TIMEOUT = 10;

export const TASK_STATUSES = [
  TASK_ACTIVE,
  TASK_DEACTIVATED,
  TASK_EXPIRED,
  TASK_DRAFT,
  TASK_SCHEDULED,
  TASK_ARCHIVED
];

export const ONA_PROFILE_URL = ONA_WEBSITE + "/" + ONA_USERNAME;
export const MODIFIED_START = "modified__gte";
export const MODIFIED_END = "modified__lte";
export const ONA_LOGIN = "https://ona.io/login";
export const FILTER_TIME_START = "submission_time__gte";
export const FILTER_TIME_END = "submission_time__lte";
