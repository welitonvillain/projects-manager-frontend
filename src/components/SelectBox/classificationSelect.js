import React from 'react';
import { useDispatch } from 'react-redux';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { lighten, darken } from 'polished';

import * as ActivityActions from '../../store/modules/activity/actions';

const options = [
  { value: 'Incidente', label: 'Incidente', color: '#5B91CC' },
  { value: 'Consultas', label: 'Consultas', color: '#5B91CC' },
  { value: 'Diagnostico', label: 'Diagnóstico', color: '#5B91CC' },
  { value: 'Analise', label: 'Análise', color: '#5B91CC' },
  { value: 'Projeto', label: 'Projeto', color: '#5B91CC' },
  { value: 'Construcao', label: 'Construção', color: '#5B91CC' },
  { value: 'Documentacao', label: 'Documentação', color: '#5B91CC' },
  { value: 'Homologacao', label: 'Homologação', color: '#5B91CC' },
  { value: 'Qualidade', label: 'Qualidade', color: '#5B91CC' },
  { value: 'Implantacao', label: 'Implantação', color: '#5B91CC' },
  { value: 'GP', label: 'GP', color: '#5B91CC' },
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
  const { identifier, activity } = props;
  const dispatch = useDispatch();

  const defaultOption = activity
    ? activity.classification
      ? {
          value: activity.classification,
          label: activity.classification,
          color: '#5B91CC',
        }
      : null
    : null;


  function handleSelectedClassification(e) {
    dispatch(
      ActivityActions.selectedTableClassification(identifier, e.value)
    );
  }
  
  return (
    <Select
      styles={DefaultStyles}
      className="classSelect"
      options={options}
      defaultValue={defaultOption}
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
  identifier: PropTypes.string.isRequired,
};
