import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { lighten, darken } from 'polished';

import * as ActivityActions from '../../store/modules/activity/actions';

const DefaultStyles = {
  container: styles => ({
    ...styles,
    height: '100%',
  }),
  control: (styles, props) => {
    return {
      ...styles,
      height: '100%',
      fontWeight: 'bold',
      border: 'none',
      borderRadius: '2px',
      boxShadow: 'none',
      backgroundColor: props.hasValue ? '#5B91CC' : '#bbb',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: props.hasValue
          ? darken(0.05, '#5B91CC')
          : darken(0.05, '#bbb'),
      },
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

  placeholder: styles => ({
    ...styles,
    fontWeight: 'bold',
    color: '#fff',
  }),
  input: styles => ({
    ...styles,
    fontWeight: 'bold',
    color: '#fff',
  }),
  valueContainer: styles => ({
    ...styles,
    justifyContent: 'center',
  }),
  singleValue: styles => ({
    ...styles,
    color: '#fff',
  }),
};

const IndicatorSeparator = () => {
  return null;
};

const DropdownIndicator = () => {
  return null;
};

export default function SelectProjects(props) {
  const { identifier, activity } = props;
  const dispatch = useDispatch();

  const options = useSelector(state => state.activity.actProjects);

  const defaultOptions = activity
    ? activity.activity
      ? { value: activity.activity, label: activity.activity }
      : null
    : null;

  function handleSelectedProject(e) {
    dispatch(ActivityActions.selectedTableProject(identifier, e.value));
  }

  return (
    <Select
      styles={DefaultStyles}
      className="prjSelect"
      options={options}
      defaultValue={defaultOptions}
      placeholder="Selecione"
      onChange={e => handleSelectedProject(e)}
      components={{
        IndicatorSeparator,
        DropdownIndicator,
      }}
    />
  );
}

SelectProjects.propTypes = {
  identifier: PropTypes.string.isRequired,
};