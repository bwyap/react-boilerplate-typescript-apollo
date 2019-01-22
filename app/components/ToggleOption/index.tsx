/**
 *
 * ToggleOption
 *
 */

import * as React from 'react';
import * as PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { ToggleOptionComponentFn } from './types';

const ToggleOption: ToggleOptionComponentFn = ({
  value,
  message = null,
  intl,
}) => (
  <option value={value}>{message ? intl.formatMessage(message) : value}</option>
);

ToggleOption.propTypes = {
  value: PropTypes.string.isRequired,
  message: PropTypes.object,
  intl: intlShape.isRequired,
};

export default injectIntl(ToggleOption);
