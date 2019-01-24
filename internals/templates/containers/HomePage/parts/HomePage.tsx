/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import * as React from 'react';
// import * as PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import {
  connect,
  MapDispatchToPropsFunction,
  MapStateToProps,
} from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from '../../../utils/injectReducer';
import injectSaga from '../../../utils/injectSaga';

import messages from '../messages';
import reducer from '../store/reducer';
import saga from '../store/saga';
import {
  HomePageMergedProps,
  HomePageDispatchProps,
  HomePageProps,
  HomePageStateProps,
} from '../types';
import { MyReducerState } from '../../../typings/store';

export class HomePage extends React.PureComponent<HomePageMergedProps> {
  // static propTypes = {};

  render() {
    return (
      <article>
        <Helmet>
          <title>Home Page</title>
          <meta
            name="description"
            content="A React.js Boilerplate application homepage"
          />
        </Helmet>
        <div style={{ textAlign: 'center' }}>
          <h2>
            <FormattedMessage {...messages.startProjectHeader} />
          </h2>
          <p>
            <FormattedMessage {...messages.startProjectMessage} />
          </p>
        </div>
      </article>
    );
  }
}

const mapDispatchToProps: MapDispatchToPropsFunction<
  HomePageDispatchProps,
  HomePageProps
> = dispatch => ({});

const mapStateToProps: MapStateToProps<
  HomePageStateProps,
  HomePageProps,
  MyReducerState
> = createStructuredSelector({});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HomePage);

export { mapDispatchToProps };
