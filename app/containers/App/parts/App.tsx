/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import { connect, MapStateToProps } from 'react-redux';

import HomePage from '../../../containers/HomePage/Loadable';
import FeaturePage from '../../../containers/FeaturePage/Loadable';
import NotFoundPage from '../../../containers/NotFoundPage/Loadable';

import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

import GlobalStyle from '../../../global-styles';

import { AppMergedProps, AppStateProps, AppProps } from '../types';
import { MyReducerState } from '../../../typings/store';
import { makeSelectLocationPathname } from '../store/selectors';

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

export class App extends React.PureComponent<AppMergedProps> {
  render() {
    return (
      <AppWrapper>
        <Helmet
          titleTemplate="%s - React.js Boilerplate"
          defaultTitle="React.js Boilerplate"
        >
          <meta
            name="description"
            content="A React.js Boilerplate application"
          />
        </Helmet>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/features" component={FeaturePage} />
          <Route path="" component={NotFoundPage} />
        </Switch>
        <Footer />
        <GlobalStyle />
      </AppWrapper>
    );
  }
}

export const mapStateToProps: MapStateToProps<
  AppStateProps,
  AppProps,
  MyReducerState
> = state => ({
  // We need to map this prop to the component to ensure that routing updates the app
  pathname: makeSelectLocationPathname()(state),
});

export default connect(mapStateToProps)(App);
