import produce, { original } from 'immer';
import { uuid } from 'uuidv4';
import { set, isBefore, addMinutes, format, formatISO } from 'date-fns';

const INITIAL_STATE = {
  uniqueId: uuid().split('-')[0],
  search: [],
  isSearching: false,
  selectedProject: null,

  date: null,

  activities: { 1: [], 2: [], 3: [], 4: [], 5: [] },
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

        if (!selectedProject) return;

        const duplicate = actProjects.find(
          e => e.value === selectedProject.value
        );

        if (!duplicate) {
          draft.actProjects = [...actProjects, selectedProject];
        }
      });

    case '@activity/SET_DATE': {
      return produce(state, draft => {
        draft.date = action.payload.date;
      });
    }

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

    case '@activity/RESET_ACTIVITIES':
      return produce(state, draft => {
        draft.activities = { 1: [], 2: [], 3: [], 4: [], 5: [] };
      });

    case '@activity/CREATE_NEW_ACTIVITY':
      return produce(state, draft => {
        const { day } = action.payload;

        const stringDay = day.toString();
        const activitiesArray = draft.activities;

        const index = activitiesArray[stringDay].length - 1;
        if (index !== -1 && activitiesArray[stringDay][index].end === '') return;

        const row = {
          activity: '',
          description: '',
          classification: '',
          start: '',
          end: '',
          id: null,
          db: false,
        };

        row.id = state.uniqueId;
        activitiesArray[stringDay].push(row);

        draft.activities = activitiesArray;
        // eslint-disable-next-line prefer-destructuring
        draft.uniqueId = uuid().split('-')[0];

        console.log(state.activities)
      });

    case '@activity/TABLE_PROJECT':
      return produce(state, draft => {
        const { id, project } = action.payload;

        const index = draft.activities[id.substr(0, 1)].findIndex(
          e => e.id === id.substr(1)
        );

        const object = original(draft.activities[id.substr(0, 1)][index]);

        const data = { ...object };

        data.activity = project;

        if (index >= 0) {
          draft.activities[id.substr(0, 1)].splice(index, 1, data);
        }
      });

    case '@activity/TABLE_CLASSIFICATION':
      return produce(state, draft => {
        const { id, classification } = action.payload;

        const index = draft.activities[id.substr(0, 1)].findIndex(
          e => e.id === id.substr(1)
        );
        const object = original(draft.activities[id.substr(0, 1)][index]);

        const data = { ...object };
        data.classification = classification;

        if (index >= 0) {
          draft.activities[id.substr(0, 1)].splice(index, 1, data);
        }
      });

    case '@activity/TABLE_INPUT':
      return produce(state, draft => {
        const { id, description } = action.payload;

        const index = draft.activities[id.substr(0, 1)].findIndex(
          e => e.id === id.substr(1)
        );
        const object = original(draft.activities[id.substr(0, 1)][index]);

        const data = { ...object };

        data.description = description;

        if (index >= 0) {
          draft.activities[id.substr(0, 1)].splice(index, 1, data);
        }
      });

    case '@activity/TABLE_HOUR':
      return produce(state, draft => {
        const { id, name, hour } = action.payload;

        const indexActivity = draft.activities[id.substr(0, 1)].findIndex(
          e => e.id === id.substr(1)
        );
        const objectActivity = original(
          draft.activities[id.substr(0, 1)][indexActivity]
        );

        const dataActivity = { ...objectActivity };

        if (name === 'start') {
          dataActivity.start = hour;

          const indexHour = draft.hours.findIndex(e => e.value === hour);

          draft.hours.splice(0, indexHour + 1);
          draft.activities[id.substr(0, 1)].splice(
            indexActivity,
            1,
            dataActivity
          );
        }

        if (name === 'end') {
          dataActivity.end = hour;

          const indexHour = draft.hours.findIndex(e => e.value === hour);

          draft.hours.splice(0, indexHour);
          draft.activities[id.substr(0, 1)].splice(
            indexActivity,
            1,
            dataActivity
          );
        }
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
          draft.activities = activitiesErrors;
        } else {
          draft.activities = [];
        }
      });

    case '@activity/DELETE_ACTIVITY':
      return produce(state, draft => {
        const { id } = action.payload;

        const index = draft.activities[id.substr(0, 1)].findIndex(
          e => e.id === id.substr(1)
        );

        console.log(id);

        if (index >= 0) {
          draft.activities[id.substr(0, 1)].splice(index, 1);
        }
      });

    default:
      return state;
  }
}
