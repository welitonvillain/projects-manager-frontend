import { all, call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '../../../services/api';

import { successProjects, returnProjects, successActivities } from './actions';
import { signOut } from '../auth/actions';

// faz o carregamento inicial dos projetos já atuados pelo usuário
export function* loadProjects() {
  try {
    const res = yield call(api.get, 'activities');

    const { data } = res;

    const filterMulti = (arr, condition) => {
      const filter = arr.reduce((newArray, element) => {
        if (!newArray.some(x => condition(element, x))) {
          newArray.push(element);
        }
        return newArray;
      }, []);

      return filter;
    };

    const response = filterMulti(data, (a, b) => a.project_id === b.project_id);

    const projects = Object.keys(response).map(key => {
      const dt = { value: '', label: '' };

      // space adiciona o 'traço' entre o código e o título do projeto
      const space = ' - ';
      dt.value = response[key].project.code;
      dt.label = dt.value + space + response[key].project.title;

      return dt;
    });

    yield put(successProjects(projects));
  } catch (err) {
    if (err.response.status === 401) {
      yield put(signOut());
    }
  }
}

export function* searchProjects({ payload }) {
  try {
    const res = yield call(api.get, `projects/${payload.input}`);

    const { data } = res;

    const projects = Object.keys(data).map(key => {
      const dt = { value: '', label: '' };

      // space adiciona o 'traço' entre o código e o título do projeto
      const space = ' - ';
      dt.value = data[key].code;
      dt.label = dt.value + space + data[key].title;

      return dt;
    });

    yield put(returnProjects(projects));
  } catch (err) {
    if (err.response.status === 401) {
      yield put(signOut());
    }
  }
}

export function* postActivities({ payload }) {
  try {
    const res = yield call(api.post, 'activities', payload.activities);

    const { data } = res;

    data.forEach(e => {
      toast.error(e.message);
    });

    yield put(successActivities(data));
  } catch (err) {
    if (err.response.status === 401) {
      yield put(signOut());
    }
  }
}

export default all([
  takeLatest('@activity/REQUEST_LOAD_PROJECTS', loadProjects),
  takeLatest('@activity/REQUEST_ACTIVITIES', postActivities),
  takeLatest('@activity/REQUEST_SEARCH_PROJECTS', searchProjects),
]);
