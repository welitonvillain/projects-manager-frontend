export function requestProjects() {
  return {
    type: '@activity/REQUEST_LOAD_PROJECTS',
    payload: null,
  };
}

export function successProjects(projects) {
  return {
    type: '@activity/SUCCESS_LOAD_PROJECTS',
    payload: { projects },
  };
}

export function searchProjects(input) {
  return {
    type: '@activity/REQUEST_SEARCH_PROJECTS',
    payload: { input },
  };
}

export function returnProjects(projects) {
  return {
    type: '@activity/SUCCESS_SEARCH_PROJECTS',
    payload: { projects },
  };
}

export function selectedProject(project) {
  return {
    type: '@activity/SELECTED_PROJECT',
    payload: { project },
  };
}

export function addProject() {
  return {
    type: '@activity/ADD_PROJECT',
    payload: null,
  };
}

export function setDate(date) {
  return {
    type: '@activity/SET_DATE',
    payload: { date },
  };
}

export function initDate(date) {
  return {
    type: '@activity/INIT_DATE',
    payload: { date },
  };
}

export function resetActivities() {
  return {
    type: '@activity/RESET_ACTIVITIES',
  };
}

export function createActivity(day) {
  return {
    type: '@activity/CREATE_NEW_ACTIVITY',
    payload: { day },
  };
}

export function selectedTableProject(id, project) {
  return {
    type: '@activity/TABLE_PROJECT',
    payload: { id, project },
  };
}

export function selectedTableClassification(id, classification) {
  return {
    type: '@activity/TABLE_CLASSIFICATION',
    payload: { id, classification },
  };
}

export function inputTable(id, description) {
  return {
    type: '@activity/TABLE_INPUT',
    payload: { id, description },
  };
}

export function hourTable(id, name, hour) {
  return {
    type: '@activity/TABLE_HOUR',
    payload: { id, name, hour },
  };
}

export function requestActivities(activities) {
  return {
    type: '@activity/REQUEST_ACTIVITIES',
    payload: { activities },
  };
}

export function successActivities(errors) {
  return {
    type: '@activity/SUCCESS_ACTIVITIES',
    payload: { errors },
  };
}

export function deleteActivity(id) {
  return {
    type: '@activity/DELETE_ACTIVITY',
    payload: { id },
  };
}
