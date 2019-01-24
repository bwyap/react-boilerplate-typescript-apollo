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

import messages from '../messages';
import { HomePageProps } from '../types';

export class HomePage extends React.PureComponent<HomePageProps> {
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

export default HomePage;
