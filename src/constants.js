export const API_ENDPOINT = process.env.REACT_APP_KAZNET_ENDPOINT;
export const API_TOKEN = process.env.REACT_APP_API_TOKEN;
export const ONA_WEBSITE = process.env.REACT_APP_ONA_WEBSITE;
export const ONA_USERNAME = process.env.REACT_APP_ONA_USERNAME;
export const WEBSITE_NAME = process.env.REACT_APP_WEBSITE_NAME;
export const PAYMENT_METHOD = process.env.REACT_APP_PAYMENT_METHOD
  ? process.env.REACT_APP_PAYMENT_METHOD
  : 'Payment No.';
export const SAMPLE_PHONE_NUMBER = process.env.REACT_APP_SAMPLE_PHONE_NUMBER
  ? process.env.REACT_APP_SAMPLE_PHONE_NUMBER
  : '+254 799 000 000';
export const TASK_ACTIVE = 'a';
export const TASK_DEACTIVATED = 'b';
export const TASK_EXPIRED = 'c';
export const TASK_DRAFT = 'd';
export const TASK_SCHEDULED = 's';
export const TASK_ARCHIVED = 'e';
export const TASK_ALL = '';
export const ALL = 'All';
export const ACTIVE = 'Active';
export const DEACTIVATED = 'Deactivated';
export const EXPIRED = 'Expired';
export const SCHEDULED = 'Scheduled';
export const ARCHIVED = 'Archived';
export const DRAFT = 'Draft';
export const NAME = 'Name';
export const NEED_REVIEW = 'Need Review';
export const CREATED = 'Created';
export const EXPIRES = 'Expires';
export const FORM = 'Form';
export const ESTIMATED_TIME = '00:15';
export const ESTIMATED_TIME_INT = '15';
export const TASK_DATE_FORMAT = 'YYYY-MM-DD';
export const TASK_LOCATION_START = '09:00';
export const TASK_LOCATION_END = '17:00';
export const TASK_LOCATION_TIMING_RULE = 'FREQ=DAILY;INTERVAL=1;COUNT=1';
export const TASK_SORT_ATTRIBUTE = 'modified';
export const CLIENT_SORT_ATTRIBUTE = 'modified';
export const LOCATION_SORT_ATTRIBUTE = 'modified';
export const LOCATION_TYPE_SORT_ATTRIBUTE = 'modified';
export const USERS_SORT_ATTRIBUTE = 'modified';
export const TASK_SORT_FIELD = '-modified';
export const FORM_SORT_FIELD = '-modified';
export const FILTER_TIME_START = 'submission_time__gte';
export const FILTER_TIME_END = 'submission_time__lte';
export const SORT_ASC = 'asc';
export const SORT_DESC = 'desc';
export const NOT_APPLICABLE = 'N/A';
export const BEGINNER = '1';
export const INTERMEDIATE = '2';
export const ADVANCED = '3';
export const EXPERT = '4';
export const ADMIN_ROLE = '1';
export const CONTRIBUTOR_ROLE = '2';
export const SUBMISSION_APPROVED = 'a';
export const SUBMISSION_REJECTED = 'b';
export const SUBMISSION_UNDER_REVIEW = 'c';
export const SUBMISSION_PENDING = 'd';
export const USER_SUBMISSION_TARGET = 10;
export const ASYNC_SEARCH_TIMEOUT = 10;
export const ASYNC_FORM_TEXT = 'Type to search or select from options';
export const TRUE = 'True';
export const FALSE = 'False';
export const XFORM_CORRECTLY_CONFIGURED = 'correctly_configured';
export const XFORM_MEMBERS_CANT_SUBMIT = 'members_cannot_submit';
export const XFORM_NO_VALID_TEAM = 'no_valid_team';
export const XFORM_NO_TEAMS_AT_ALL = 'no_teams_at_all';
export const XFORM_NO_PROJECT = 'no_project';
export const XFORM_WRONG_OWNER = 'wrong_owner';
export const INACTIVE_XFORM_VALIDATION_MESSAGE = 'You cannot assign an inactive form to a task';
export const MAIN_COLOR = '#711c27';

export const TASK_STATUSES = [
  TASK_ACTIVE,
  TASK_DEACTIVATED,
  TASK_EXPIRED,
  TASK_DRAFT,
  TASK_SCHEDULED,
  TASK_ARCHIVED
];

export const XFORM_CONFIG_STATUSES = [
  XFORM_CORRECTLY_CONFIGURED,
  XFORM_MEMBERS_CANT_SUBMIT,
  XFORM_NO_VALID_TEAM,
  XFORM_NO_TEAMS_AT_ALL,
  XFORM_NO_PROJECT,
  XFORM_WRONG_OWNER
];

// Ona stuff - should mostly come from env vars and not hard coded
export const ONA_PROFILE_URL = `${ONA_WEBSITE}/${ONA_USERNAME}`;
export const ONA_LOGIN = `${ONA_WEBSITE}/login`;
