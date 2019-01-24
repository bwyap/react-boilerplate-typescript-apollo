/*
 *
 * LanguageProvider
 *
 * This component connects the redux state language locale to the
 * IntlProvider component and i18n messages (loaded from `app/translations`)
 */

import * as React from 'react';
import * as PropTypes from 'prop-types';
import { connect, MapStateToProps } from 'react-redux';
import { createSelector } from 'reselect';
import { IntlProvider } from 'react-intl';

import { makeSelectLocale } from '../store/selectors';
import { MyReducerState } from '../../../typings/store';
import {
  LanguageProviderMergedProps,
  LanguageProviderStateProps,
  LanguageProviderProps,
  LanguageProviderState,
} from '../types';

export class LanguageProvider extends React.PureComponent<
  LanguageProviderMergedProps,
  LanguageProviderState
> {
  static propTypes = {
    locale: PropTypes.string,
    messages: PropTypes.object,
    children: PropTypes.element.isRequired,
  };

  render() {
    return (
      <IntlProvider
        locale={this.props.locale}
        key={this.props.locale}
        messages={this.props.messages[this.props.locale]}
      >
        {React.Children.only(this.props.children)}
      </IntlProvider>
    );
  }
}

const mapStateToProps: MapStateToProps<
  LanguageProviderStateProps,
  LanguageProviderProps,
  MyReducerState
> = createSelector(
  makeSelectLocale(),
  locale => ({ locale }),
);

export default connect(mapStateToProps)(LanguageProvider);
