/*
 *
 * LanguageToggle
 *
 */

import * as React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import Toggle from '../../components/Toggle';
import Wrapper from './Wrapper';
import messages from './messages';
import { appLocales } from '../../i18n';
import { changeLocale } from '../LanguageProvider/actions';
import { makeSelectLocale } from '../LanguageProvider/selectors';
import { Dispatch } from 'redux';

export class LocaleToggle extends React.PureComponent<{
  locale: string;
  // TODO: add better typings
  onLocaleToggle: any;
}> {
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

const mapStateToProps = createSelector(
  makeSelectLocale(),
  locale => ({
    locale,
  }),
);

export function mapDispatchToProps(dispatch: Dispatch) {
  return {
    onLocaleToggle: evt => dispatch(changeLocale(evt.target.value)),
    dispatch,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LocaleToggle);
