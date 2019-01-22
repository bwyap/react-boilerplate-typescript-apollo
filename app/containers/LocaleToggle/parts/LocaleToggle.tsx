/*
 *
 * LanguageToggle
 *
 */

import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  connect,
  MapStateToProps,
  MapDispatchToPropsFunction,
} from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Toggle from '../../../components/Toggle';
import Wrapper from './Wrapper';
import messages from '../messages';
import { appLocales } from '../../../i18n';
import { createChangeLocaleAction } from '../../LanguageProvider/store/actions';
import { makeSelectLocale } from '../../LanguageProvider/store/selectors';
import {
  LocaleToggleStateProps,
  LocaleToggleProps,
  LocaleToggleMergedProps,
  LocaleToggleDispatchProps,
} from '../types';
import { MyReducerState } from '../../../typings/store';

export class LocaleToggle extends React.PureComponent<LocaleToggleMergedProps> {
  static propTypes = {
    onLocaleToggle: PropTypes.func,
    locale: PropTypes.string,
  };

  render() {
    return (
      <Wrapper>
        <Toggle
          value={this.props.locale}
          values={appLocales}
          messages={messages}
          onToggle={this.props.onLocaleToggle}
        />
      </Wrapper>
    );
  }
}

const mapStateToProps: MapStateToProps<
  LocaleToggleStateProps,
  LocaleToggleProps,
  MyReducerState
> = createStructuredSelector({
  locale: makeSelectLocale(),
});

export const mapDispatchToProps: MapDispatchToPropsFunction<
  LocaleToggleDispatchProps,
  LocaleToggleProps
> = dispatch => ({
  onLocaleToggle: evt =>
    dispatch(createChangeLocaleAction({ locale: evt.target.value })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LocaleToggle);
