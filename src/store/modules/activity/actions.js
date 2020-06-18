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

export function requestPostActivities(activity) {
  return {
    type: '@activity/REQUEST_POST_ACTIVITIES',
    payload: { activity },
  };
}

export function requestGetActivities(initial, final) {
  return {
    type: '@activity/REQUEST_GET_ACTIVITIES',
    payload: { initial, final },
  };
}

export function sucessGetActivities( data ) {
  return {
    type: '@activity/SUCESS_GET_ACTIVITIES',
    payload: data,
  }
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
