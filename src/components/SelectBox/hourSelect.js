import React from 'react';
import CreatableSelect from 'react-select/creatable';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { lighten, darken } from 'polished';

import * as ActivityActions from '../../store/modules/activity/actions';

const options = [
  { value: '0700', label: '07:00', isDefault: true},
  { value: '0800', label: '08:00', isDefault: true },
  { value: '0900', label: '09:00', isDefault: true },
  { value: '1000', label: '10:00', isDefault: true },
  { value: '1100', label: '11:00', isDefault: true },
  { value: '1200', label: '12:00', isDefault: true },
  { value: '1300', label: '13:00', isDefault: true },
  { value: '1400', label: '14:00', isDefault: true },
  { value: '1500', label: '15:00', isDefault: true },
  { value: '1600', label: '16:00', isDefault: true },
  { value: '1700', label: '17:00', isDefault: true },
  { value: '1800', label: '18:00', isDefault: true },
  { value: '1900', label: '19:00', isDefault: true },
];

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
      backgroundColor: props.hasValue ? lighten(0.05, '#292f4c') : '#bbb',
      cursor: 'pointer',

      ':hover': {
        backgroundColor: props.hasValue
          ? darken(0.05, '#292f4c')
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
        ? '#eee'
        : props.isSelected
        ? '#5B91CC'
        : props.isFocused
        ? lighten(0.1, '#5B91CC')
        : '#eee',
      color: props.isDisabled
        ? '#ccc'
        : props.isSelected
        ? 'white'
        : props.isFocused
        ? 'white'
        : '#666',
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
    width: '0px',
    margin: '0px',
    padding: '0px',
  }),

  valueContainer: styles => ({
    ...styles,
    justifyContent: 'center',
    height: '40px',
    padding: '0px',
    borderRadius: '2px',
    textAlign: 'center',
  }),

  placeholder: styles => ({
    ...styles,
    fontWeight: 'bold',
    color: '#fff',
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

const IndicatorsContainer = () => {
  return null;
};

function handleFormatOption(inputValue) {
  if (inputValue.length === 4) inputValue = inputValue + ':';

  console.log(inputValue)
}

export default function SelectHour(props) {
  const { identifier, name } = props;
  const dispatch = useDispatch();

  function handleChangeHour(e) {

    // Adiciona dois pontos (:) ao label de hora para padronizar e facilitar.
    if (!e.isDefault)
      e.label = e.label.substr(0,2)+':'+e.label.substr(2,2);

    dispatch(ActivityActions.hourTable(identifier, name, e.value));
    if (name === 'end') {
      dispatch(ActivityActions.createActivity(identifier.substr(0, 1)));
    }
  }

  return (
    <CreatableSelect
      styles={DefaultStyles}
      className="hrSelect"
      options={options}
      onChange={e => handleChangeHour(e)}
      placeholder="-"
      menuPlacement="auto"
      components={{
        IndicatorSeparator,
        IndicatorsContainer,
        DropdownIndicator,
      }}
    />
  );
}

SelectHour.propTypes = {
  identifier: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
