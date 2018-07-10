import _ from "lodash";

// Clients
function getClientsById(state) {
  return state.clients.clientsById;
}

function getClientById(state, id) {
  return _.get(state.clients.clientsById, id);
}

function getClientsIdArray(state) {
  return _.keys(state.clients.clientsById);
}

// Locations
function getLocationsById(state) {
  return state.locations.locationsById;
}

function getLocationsIdArray(state) {
  return _.keys(state.locations.locationsById);
}

// Tasks
function getTasksById(state) {
  return state.tasks.tasksById;
}

function getTasksIdArray(state) {
  return _.keys(state.tasks.tasksById);
}

function getTaskById(state, id) {
  return _.get(state.tasks.tasksById, id);
}

// Users
function getUsersById(state) {
  return state.users.usersById;
}

function getUsersIdArray(state) {
  return _.keys(state.users.usersById);
}

//common

function getPageLinks(tab, state, props) {
  return state[tab].pageLinks;
}

function getCurrentPage(state, porseps) {
  return state.tasks.currentPage;
}

function getFirstPage(state, props) {
  return state.tasks.pageLinks.first;
}

function getNextPage(state, props) {
  return state.tasks.pageLinks.next;
}

function getPreviousPage(state, props) {
  return state.tasks.pageLinks.prev;
}

function getLastPage(state, props) {
  return state.tasks.pageLinks.last;
}

export {
  // clients
  getClientsById,
  getClientById,
  getClientsIdArray,
  // locations
  getLocationsById,
  getLocationsIdArray,
  // tasks
  getTasksById,
  getTasksIdArray,
  getTaskById,
  // users
  getUsersById,
  getUsersIdArray,
  // common
  getPageLinks,
  getCurrentPage,
  getFirstPage,
  getNextPage,
  getPreviousPage,
  getLastPage
};