import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';
import { subDays } from 'date-fns';

import { FaPlus } from 'react-icons/fa';

import SelectClassification from '../../components/SelectBox/classification';
import SelectProjects from '../../components/SelectBox/projects';
import SelectHour from '../../components/SelectBox/hour';
import SelectAdd from '../../components/SelectBox/add';

import * as ActivityActions from '../../store/modules/activity/actions';

import {
  Wrapper,
  Header,
  Title,
  DateWrapper,
  Datepicker,
  Content,
  Add,
  Table,
  ActivityTable,
} from './styles';

export default function Activity() {
  const dispatch = useDispatch();

  const date = useSelector(state => state.activity.date);
  const activities = useSelector(state => state.activity.activities);

  useEffect(() => {
    dispatch(ActivityActions.requestProjects());
    dispatch(ActivityActions.initDate(new Date()));
  }, []);

  function handleAddProject() {
    dispatch(ActivityActions.addProject());
  }

  function handleSetDate(e) {
    dispatch(ActivityActions.setDate(e));
    dispatch(ActivityActions.initDate(e));
  }

  function handleCreateActivity() {
    dispatch(ActivityActions.createActivity());
  }

  const debounced = debounce(
    (name, value) => dispatch(ActivityActions.inputTable(name, value)),
    1000
  );

  function handleSubmitActivities() {
    dispatch(ActivityActions.requestActivities(activities));
  }

  function handleDeleteActivity(id) {
    dispatch(ActivityActions.deleteActivity(id));
  }

  return (
    <Wrapper>
      <Header>
        <Title>
          <span>Atividades Diárias</span>
        </Title>
        <DateWrapper>
          <span>DATA</span>
          <Datepicker
            popperPlacement="top-end"
            dateFormat="dd/MM/yyyy"
            minDate={subDays(new Date(), 3)}
            maxDate={new Date()}
            selected={date}
            onChange={e => handleSetDate(e)}
          />
        </DateWrapper>
      </Header>
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
                <tr key={e.id}>
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
    </Wrapper>
  );
}
