/**
 *
 * LocaleToggle
 *
 */

import * as React from 'react';
import * as PropTypes from 'prop-types';

import Select from './Select';
import ToggleOption from '../ToggleOption';
import { ToggleComponentFn } from './types';

const Toggle: ToggleComponentFn = ({
  values = null,
  value,
  messages = {},
  onToggle = null,
}) => {
  let content: JSX.Element | JSX.Element[] = <option>--</option>;

  // If we have items, render them
  if (values) {
    content = values.map(v => (
      <ToggleOption key={v} value={v} message={messages[v]} />
    ));
  }

  return (
    <Select value={value} onChange={onToggle}>
      {content}
    </Select>
  );
};

Toggle.propTypes = {
  onToggle: PropTypes.func,
  values: PropTypes.array,
  value: PropTypes.string,
  messages: PropTypes.object,
};

export default Toggle;
