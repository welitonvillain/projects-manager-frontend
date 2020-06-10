import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';
import { setDay, format, getWeek, addWeeks, subWeeks } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { FaPlus, FaAngleRight, FaAngleLeft } from 'react-icons/fa';

import { formatedWeeksNavigation, getDayOfWeek } from '../../functions/date';

import SelectClassification from '../../components/SelectBox/classificationSelect';
import SelectProjects from '../../components/SelectBox/projectSelect';
import SelectHour from '../../components/SelectBox/hourSelect';
import SelectAdd from '../../components/SelectBox/addSelect';

import * as ActivityActions from '../../store/modules/activity/actions';

import { Wrapper, Header, Title, Content, Weeks, Activities, Days, Table } from './styles';

export default function Activity() {
  const dispatch = useDispatch();

  const activities = useSelector(state => state.activity.activities);
  const [week, setWeek] = useState(setDay(new Date(), 1));

  const weekFormated = useMemo(() => formatedWeeksNavigation(week), [week]);

  const daysOfWeek = useMemo(() => getDayOfWeek(week), [week]);

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
              <Table daysOfWeek={day.id}>
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
