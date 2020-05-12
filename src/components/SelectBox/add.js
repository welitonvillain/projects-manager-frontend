import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreatableSelect from 'react-select';
import { debounce } from 'lodash';
import { lighten, darken } from 'polished';

import * as ActivityActions from '../../store/modules/activity/actions';

const DefaultStyles = {
  container: styles => ({
    ...styles,
    height: '36px',
    width: '280px',
  }),
  control: styles => {
    return {
      ...styles,
      minHeight: '36px',
      fontWeight: 'normal',
      border: 'none',
      borderRadius: '2px',
      boxShadow: 'none',
      backgroundColor: darken(0.01, '#ddd'),
      cursor: 'pointer',
    };
  },
  menu: styles => ({
    ...styles,
    backgroundColor: '#eee',
  }),
  option: (styles, props) => {
    return {
      ...styles,
      fontWeight: 'bold',
      height: '36px',
      backgroundColor: props.isDisabled
        ? null
        : props.isSelected
        ? '#5B91CC'
        : props.isFocused
        ? lighten(0.1, '#5B91CC')
        : '#eee',
      color: props.isSelected ? 'white' : props.isFocused ? 'white' : '#666',
      cursor: 'pointer',

      ':active': {
        ...styles[':active'],
        backgroundColor:
          !props.isDisabled &&
          (props.isSelected ? props.data.color : lighten(0.1, '#5B91CC')),
      },
    };
  },

  input: styles => ({
    ...styles,
    fontWeight: 'normal',
    color: '#666',
  }),
  valueContainer: styles => ({
    ...styles,
    justifyContent: 'center',
    height: '36px',
  }),
  singleValue: styles => ({
    ...styles,
    color: '#666',
  }),
  indicatorsContainer: styles => ({
    ...styles,
    height: '36px',
  }),
};

const IndicatorSeparator = () => {
  return null;
};

const DropdownIndicator = () => {
  return null;
};

export default function SelectAdd() {
  const dispatch = useDispatch();
  const options = useSelector(state => state.activity.search);

  const debounced = debounce(
    e => dispatch(ActivityActions.searchProjects(e)),
    500
  );

  function handleSearch(e) {
    if (e !== ' ') debounced(e);
  }

  function handleSetSelected(e) {
    if (e) dispatch(ActivityActions.selectedProject(e));
  }

  return (
    <CreatableSelect
      isClearable
      placeholder="Pesquisar Projetos"
      styles={DefaultStyles}
      options={options}
      onInputChange={e => handleSearch(e)}
      onChange={e => handleSetSelected(e)}
      components={{
        IndicatorSeparator,
        DropdownIndicator,
      }}
    />
  );
}
