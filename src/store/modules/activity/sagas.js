import { all, call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import api from '../../../services/api';

import { successProjects, returnProjects, successActivities, sucessGetActivities } from './actions';
import { signOut } from '../auth/actions';

const schema = Yup.object().shape({
  activity: Yup.string().required('Atividade Inválida'),
  description: Yup.string().required('Descrição Inválida'),
  classification: Yup.string().required('Classificação Inválida'),
  start: Yup.string().required('Hora inicio Inválida'),
  end: Yup.string().required('Hora final Inválida'),
  id: Yup.string().required(),
  db: Yup.boolean().required(),
})

// faz o carregamento inicial dos projetos já atuados pelo usuário
export function* loadProjects() {
  try {
    const res = yield call(api.get, 'activities/projects');

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

export function* getActivities({ payload }) {
  const { initial, final } = payload;

  try {
    const res = yield call(api.get, 'activities', { 
      params: {
        initial: initial,
        final: final,
      }
    });

    const { data } = res;

    console.log(data);

    yield put(sucessGetActivities(data));
    
  } catch (err) {
    console.log(err);
  }
}


export function* postActivities({ payload }) {
  const { activity } = payload;

  console.log(schema.isValid(activity));

  try {
    const res = yield call(api.post, 'activities', activity);

    const { data } = res;

    data.forEach(e => {
      toast.error(e.message);
    });

    console.log(data);

    // yield put(successActivities(data));
  } catch (err) {
    if (err.response.status === 401) {
      yield put(signOut());
    }
  }
}

export default all([
  takeLatest('@activity/REQUEST_LOAD_PROJECTS', loadProjects),
  takeLatest('@activity/REQUEST_POST_ACTIVITIES', postActivities),
  takeLatest('@activity/REQUEST_SEARCH_PROJECTS', searchProjects),
  takeLatest('@activity/REQUEST_GET_ACTIVITIES', getActivities),
]);
