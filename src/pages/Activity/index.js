import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';
import {
  getDay,
  setDay,
  addDays,
  subDays,
  getMonth,
  format,
  getWeek,
  addWeeks,
  subWeeks,
} from 'date-fns';
import pt from 'date-fns/locale/pt';

import { FaPlus, FaAngleRight, FaAngleLeft } from 'react-icons/fa';

import SelectClassification from '../../components/SelectBox/classification';
import SelectProjects from '../../components/SelectBox/projects';
import SelectHour from '../../components/SelectBox/hour';
import SelectAdd from '../../components/SelectBox/add';

import * as ActivityActions from '../../store/modules/activity/actions';

import {
  Wrapper,
  Header,
  Title,
  Content,
  Weeks,
  Activities,
  Days,
  Add,
  Table,
  ActivityTable,
} from './styles';

export default function Activity() {
  const dispatch = useDispatch();

  const activities = useSelector(state => state.activity.activities);
  const [week, setWeek] = useState(setDay(new Date(), 1));

  const weekFormated = useMemo(() => {
    const finalWeek = addDays(week, 4);

    return getMonth(finalWeek) !== getMonth(week)
      ? format(week, "dd 'de' MMMM 'a' ", { locale: pt }) +
          format(finalWeek, "dd 'de' MMMM", { locale: pt })
      : format(week, "dd 'a' ") +
          format(finalWeek, "dd 'de' MMMM", { locale: pt });
  }, [week]);

  const daysOfWeek = useMemo(() => {
    const days = [];

    if (getWeek(week) === getWeek(new Date())) {
      const indexDay = getDay(new Date());
      for (let i = 0; i <= indexDay - 1; i += 1) {
        days.push({ id: indexDay - i, date: subDays(new Date(), i) });
      }

      return days;
    }

    for (let i = 4; i >= 0; i -= 1) {
      days.push({ id: i + 1, date: addDays(week, i) });
    }

    return days;
  }, [week]);

  useEffect(() => {
    dispatch(ActivityActions.setDate(new Date()));
    dispatch(ActivityActions.requestProjects());
  }, []);

  function handleIncrementWeek() {
    dispatch(ActivityActions.resetActivities());
    setWeek(addWeeks(week, 1));
  }

  function handleDecrementWeek() {
    dispatch(ActivityActions.resetActivities());
    setWeek(subWeeks(week, 1));
  }

  function handleAddProject() {
    dispatch(ActivityActions.addProject());
  }

  function handleCreateActivity(day) {
    dispatch(ActivityActions.createActivity(day));
  }

  const debounced = debounce(
    (name, value) => dispatch(ActivityActions.inputTable(name, value)),
    1000
  );

  function handleDeleteActivity(id) {
    dispatch(ActivityActions.deleteActivity(id));
  }

  return (
    <Wrapper>
      <Header>
        <Title>
          <span>Atividades Diárias</span>
        </Title>
        <div className="add-projects">
          <SelectAdd />
          <button type="button" onClick={handleAddProject}>
            <FaPlus />
          </button>
        </div>
      </Header>
      <Content>
        <Weeks>
          <button type="button" onClick={handleDecrementWeek}>
            <FaAngleLeft />
          </button>
          <strong>{weekFormated}</strong>
          <button
            type="button"
            disabled={getWeek(week) === getWeek(new Date())}
            onClick={handleIncrementWeek}
          >
            <FaAngleRight />
          </button>
        </Weeks>
        <Activities>
          {daysOfWeek.map(day => (
            <Days key={day.id.toString()}>
              <div className="day">
                <span>{format(day.date, "EEEE',' dd ", { locale: pt })}</span>
              </div>
              <Table>
                <thead>
                  <tr>
                    <th id="act"> </th>
                    <th id="desc"> </th>
                    <th id="class"> </th>
                    <th id="init"> </th>
                    <th id="end"> </th>
                    <th id="delete"> </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(activities[day.id.toString()]).map(e => (
                    <tr
                      key={
                        day.id.toString() + activities[day.id.toString()][e].id
                      }
                    >
                      <td>
                        <SelectProjects
                          identifier={
                            day.id.toString() +
                            activities[day.id.toString()][e].id
                          }
                        />
                      </td>
                      <td>
                        <div className="div-description">
                          <input
                            name={
                              day.id.toString() +
                              activities[day.id.toString()][e].id
                            }
                            type="text"
                            placeholder="Insira a descrição de sua atividade"
                            onChange={event =>
                              debounced(event.target.name, event.target.value)
                            }
                          />
                        </div>
                      </td>
                      <td>
                        <SelectClassification
                          identifier={
                            day.id.toString() +
                            activities[day.id.toString()][e].id
                          }
                        />
                      </td>
                      <td>
                        <SelectHour
                          identifier={
                            day.id.toString() +
                            activities[day.id.toString()][e].id
                          }
                          name="start"
                        />
                      </td>
                      <td>
                        <SelectHour
                          identifier={
                            day.id.toString() +
                            activities[day.id.toString()][e].id
                          }
                          name="end"
                        />
                      </td>
                      <td>
                        <div className="div-delete">
                          <button
                            name={
                              day.id.toString() +
                              activities[day.id.toString()][e].id
                            }
                            type="button"
                            onClick={event =>
                              handleDeleteActivity(event.target.name)
                            }
                          >
                            X
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              {(getWeek(week) !== getWeek(new Date()) &&
                Object.keys(activities[day.id.toString()]).length <= 0) ||
              Object.keys(activities[day.id.toString()]).length <= 0 ? (
                <div className="addActivity">
                  <button
                    type="button"
                    onClick={() => handleCreateActivity(day.id)}
                  >
                    Adicionar
                  </button>
                </div>
              ) : null}
            </Days>
          ))}
        </Activities>
      </Content>
    </Wrapper>
  );
}

/*

  function handleSetDate(e) {
    dispatch(ActivityActions.initDate(e));
  }

  function handleAddProject() {
    dispatch(ActivityActions.addProject());
  }

  function handleSubmitActivities() {
    dispatch(ActivityActions.requestActivities(activities));
  }
  */

/*
      <Content>
        <Add>
          <div className="add-projects">
            <SelectAdd />
            <button type="button" onClick={handleAddProject}>
              <FaPlus />
            </button>
          </div>
          <div className="add-activities">
            <button type="button" onClick={handleCreateActivity}>
              <FaPlus />
            </button>
            <button
              className="submit-button"
              type="button"
              onClick={handleSubmitActivities}
            >
              ENVIAR
            </button>
          </div>
        </Add>
        <ActivityTable>
          <Table>
            <thead>
              <tr>
                <th id="act">ATIVIDADE</th>
                <th id="desc">DESCRIÇÃO</th>
                <th id="class">CLASSIFICAÇÃO</th>
                <th id="init">INÍCIO</th>
                <th id="end">FIM</th>
                <th id="delete"> </th>
              </tr>
            </thead>
            <tbody>
              {activities.map(e => (
                <tr key={e}>
                  <td>
                    <SelectProjects identifier={e.id} />
                  </td>
                  <td>
                    <div className="div-description">
                      <input
                        name={e.id}
                        type="text"
                        placeholder="Insira a descrição de sua atividade"
                        onChange={event =>
                          debounced(event.target.name, event.target.value)
                        }
                      />
                    </div>
                  </td>
                  <td>
                    <SelectClassification identifier={e.id} />
                  </td>
                  <td>
                    <SelectHour identifier={e.id} name="start" />
                  </td>
                  <td>
                    <SelectHour identifier={e.id} name="end" />
                  </td>
                  <td>
                    <div className="div-delete">
                      <button
                        name={e.id}
                        type="button"
                        onClick={event =>
                          handleDeleteActivity(event.target.name)
                        }
                      >
                        X
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </ActivityTable>
      </Content>
*/
