/**
 *
 * LocaleToggle
 *
 */

import * as React from 'react';
import * as PropTypes from 'prop-types';

import Select from './Select';
import ToggleOption from '../ToggleOption';

const Toggle = props => {
  let content = <option>--</option>;

  // If we have items, render them
  if (props.values) {
    content = props.values.map(value => (
      <ToggleOption key={value} value={value} message={props.messages[value]} />
    ));
  }

  return (
    <Select value={props.value} onChange={props.onToggle}>
      {content}
    </Select>
  );
};

(Toggle as any).propTypes = {
  onToggle: PropTypes.func,
  values: PropTypes.array,
  value: PropTypes.string,
  messages: PropTypes.object,
};

export default Toggle;
