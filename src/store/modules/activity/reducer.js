import produce, { original } from 'immer';
import { set, isBefore, addMinutes, format, formatISO } from 'date-fns';

const INITIAL_STATE = {
  search: [],
  isSearching: false,
  selectedProject: null,
  date: null,

  activities: [],
  hours: [],

  actProjects: [
    { value: '1', label: 'Suporte a usuários' },
    { value: '2', label: 'Resolução de problemas' },
    { value: '3', label: 'Outras Atividades' },
    { value: '4', label: 'Outros Projetos' },
    { value: '5', label: 'Prospecção' },
  ],
};

export default function activity(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@activity/SUCCESS_LOAD_PROJECTS':
      return produce(state, draft => {
        draft.actProjects = [...state.actProjects, ...action.payload.projects];
      });

    case '@activity/SUCCESS_SEARCH_PROJECTS':
      return produce(state, draft => {
        draft.search = action.payload.projects;
        draft.isSearching = true;
      });

    case '@activity/SELECTED_PROJECT':
      return produce(state, draft => {
        draft.selectedProject = action.payload.project;
      });

    case '@activity/ADD_PROJECT':
      return produce(state, draft => {
        const { selectedProject, actProjects } = state;

        function check(e) {
          return e.value === selectedProject.value;
        }

        const duplicate = actProjects.find(check);

        if (!duplicate) {
          draft.actProjects = [...actProjects, selectedProject];
        }
      });

    case '@activity/SET_DATE':
      return produce(state, draft => {
        draft.date = action.payload.date;
      });

    case '@activity/INIT_DATE':
      return produce(state, draft => {
        const { date } = action.payload;
        draft.date = set(date, { hours: 7, minutes: 0, seconds: 0 });

        const endDay = set(draft.date, { hours: 20, minutes: 0 });
        let startDay = draft.date;

        draft.hours = [];

        while (isBefore(startDay, endDay)) {
          draft.hours.push({
            value: formatISO(startDay),
            label: format(startDay, 'H:mm'),
            isDisabled: false,
          });

          startDay = addMinutes(startDay, 15);
        }
      });

    case '@activity/CREATE_NEW_ACTIVITY':
      return produce(state, draft => {
        const row = {
          activity: '',
          description: '',
          classification: '',
          start: '',
          end: '',
          id: null,
        };

        row.id = state.activities.length + 1;
        draft.activities = [...state.activities, row];
      });

    case '@activity/TABLE_PROJECT':
      return produce(state, draft => {
        const { id, project } = action.payload;

        const index = draft.activities.findIndex(e => e.id === id);
        const object = original(draft.activities[index]);

        const data = { ...object };

        data.activity = project;

        if (index >= 0) {
          draft.activities.splice(index, 1, data);
        }
      });

    case '@activity/TABLE_CLASSIFICATION':
      return produce(state, draft => {
        const { id, classification } = action.payload;

        const index = draft.activities.findIndex(e => e.id === id);
        const object = original(draft.activities[index]);

        const data = { ...object };

        data.classification = classification;

        if (index >= 0) {
          draft.activities.splice(index, 1, data);
        }
      });

    case '@activity/TABLE_INPUT':
      return produce(state, draft => {
        const { id, description } = action.payload;

        const index = draft.activities.findIndex(
          e => e.id === parseInt(id, 10)
        );
        const object = original(draft.activities[index]);

        const data = { ...object };

        data.description = description;

        if (index >= 0) {
          draft.activities.splice(index, 1, data);
        }
      });

    case '@activity/TABLE_HOUR':
      return produce(state, draft => {
        const { id, name, hour } = action.payload;

        const indexActivity = draft.activities.findIndex(e => e.id === id);
        const objectActivity = original(draft.activities[indexActivity]);

        const dataActivity = { ...objectActivity };

        if (name === 'start') {
          dataActivity.start = hour;

          const indexHour = draft.hours.findIndex(e => e.value === hour);

          draft.hours.splice(0, indexHour + 1);
          draft.activities.splice(indexActivity, 1, dataActivity);
        }

        if (name === 'end') {
          dataActivity.end = hour;

          const indexHour = draft.hours.findIndex(e => e.value === hour);

          draft.hours.splice(0, indexHour);
          draft.activities.splice(indexActivity, 1, dataActivity);
        }

        console.log(state.activities);
      });

    case '@activity/SUCCESS_ACTIVITIES':
      return produce(state, draft => {
        const { errors } = action.payload;
        const activitiesErrors = [];

        if (errors.length > 0) {
          errors.forEach(e => {
            const index = draft.activities.findIndex(a => a.id === e.id);

            if (index !== null) {
              const element = draft.activities.slice(index, index + 1);
              activitiesErrors.push(element[0]);
            }
          });

          draft.activities = [];
          console.log(activitiesErrors);
          draft.activities = activitiesErrors;
        } else {
          draft.activities = [];
        }
      });

    case '@activity/DELETE_ACTIVITY':
      return produce(state, draft => {
        const { id } = action.payload;
        console.log('ID: ', id);
        const index = draft.activities.findIndex(
          element => element.id === parseInt(id, 10)
        );
        console.log('INDEX', index);

        if (index >= 0) {
          draft.activities.splice(index, 1);
        }

        console.log(state.activities);
      });

    default:
      return state;
  }
}
