// Exports all reducers
import global from './global/reducer';
import tasks from './tasks/reducer';
import users from './users/reducer'
import locations from './locations/reducer'
import clients from './clients/reducer'

export {
  tasks,
  global,
  users,
  locations,
  clients
};
