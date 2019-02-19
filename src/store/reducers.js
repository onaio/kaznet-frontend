// Exports all reducers
import global from './global/reducer';
import tasks from './tasks/reducer';
import users from './users/reducer';
import locations from './locations/reducer';
import locationTypes from './locationTypes/reducer';
import clients from './clients/reducer';
import forms from './forms/reducer';
import contentTypes from './contentTypes/reducer';
import errorHandler from './errorHandler/reducer';

export {
  tasks,
  global,
  users,
  locations,
  locationTypes,
  clients,
  forms,
  contentTypes,
  errorHandler
};
