import React from 'react';
import { useDispatch } from 'react-redux';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { lighten, darken } from 'polished';

import * as ActivityActions from '../../store/modules/activity/actions';

const options = [
  { value: 'Incidente', label: 'Incidente', color: '#5B91CC', rating: 'OLA' },
  { value: 'Projeto', label: 'Projeto', color: '#F89648' },
  { value: 'Análise', label: 'Análise', color: '#6EA469' },
  { value: 'Suporte', label: 'Suporte', color: '#E13C47' },
];

const DefaultStyles = {
  container: styles => ({
    ...styles,
    height: '100%',
  }),
  control: (styles, props) => {
    const selectColor = props.getValue();
    const color = Object.keys(selectColor).map(key => {
      return selectColor[key].color;
    });
    return {
      ...styles,
      height: '100%',
      fontWeight: 'bold',
      border: 'none',
      borderRadius: '2px',
      boxShadow: 'none',
      backgroundColor: props.hasValue ? color : '#bbb',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: props.hasValue
          ? darken(0.05, `${color}`)
          : darken(0.05, '#bbb'),
      },
    };
  },
  menu: styles => ({
    ...styles,
    backgroundColor: '#eee',
  }),
  option: (styles, props) => {
    const { color } = props.data;

    return {
      ...styles,
      fontWeight: 'bold',
      backgroundColor: props.isDisabled
        ? null
        : props.isSelected
        ? props.data.color
        : props.isFocused
        ? lighten(0.1, color)
        : '#eee',
      color: props.isSelected ? 'white' : props.isFocused ? 'white' : '#666',
      cursor: 'pointer',

      ':active': {
        ...styles[':active'],
        backgroundColor:
          !props.isDisabled &&
          (props.isSelected ? props.data.color : lighten(0.1, color)),
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

export default function SelectClassification(props) {
  const dispatch = useDispatch();

  function handleSelectedClassification(e) {
    dispatch(
      ActivityActions.selectedTableClassification(props.identifier, e.value)
    );
  }

  return (
    <Select
      styles={DefaultStyles}
      className="classSelect"
      options={options}
      placeholder="Selecione"
      onChange={e => handleSelectedClassification(e)}
      components={{
        IndicatorSeparator,
        DropdownIndicator,
      }}
    />
  );
}

SelectClassification.propTypes = {
  identifier: PropTypes.number.isRequired,
};
