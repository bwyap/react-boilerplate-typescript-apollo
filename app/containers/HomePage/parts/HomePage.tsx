/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import * as React from 'react';
import * as PropTypes from 'prop-types';
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
import {
  makeSelectRepos,
  makeSelectLoading,
  makeSelectError,
} from '../../../containers/App/store/selectors';
import H2 from '../../../components/H2';
import ReposList from '../../../components/ReposList';
import AtPrefix from './AtPrefix';
import CenteredSection from './CenteredSection';
import Form from './Form';
import Input from './Input';
import Section from './Section';
import messages from '../messages';
import { createLoadReposAction } from '../../App/store/actions';
import { createChangeUsernameAction } from '../store/actions';
import { makeSelectUsername } from '../store/selectors';
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
  static propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.object,
    repos: PropTypes.array,
    onSubmitForm: PropTypes.func,
    username: PropTypes.string,
    onChangeUsername: PropTypes.func,
  };

  /**
   * when initial state username is not null, submit the form to load repos
   */
  componentDidMount() {
    const { username, onSubmitForm } = this.props;
    if (username && username.trim().length > 0) {
      onSubmitForm();
    }
  }

  render() {
    const { loading, error, repos } = this.props;
    const reposListProps = {
      loading,
      error,
      repos,
    };

    return (
      <article>
        <Helmet>
          <title>Home Page</title>
          <meta
            name="description"
            content="A React.js Boilerplate application homepage"
          />
        </Helmet>
        <div>
          <CenteredSection>
            <H2>
              <FormattedMessage {...messages.startProjectHeader} />
            </H2>
            <p>
              <FormattedMessage {...messages.startProjectMessage} />
            </p>
          </CenteredSection>
          <Section>
            <H2>
              <FormattedMessage {...messages.trymeHeader} />
            </H2>
            <Form onSubmit={this.props.onSubmitForm}>
              <label htmlFor="username">
                <FormattedMessage {...messages.trymeMessage} />
                <AtPrefix>
                  <FormattedMessage {...messages.trymeAtPrefix} />
                </AtPrefix>
                <Input
                  id="username"
                  type="text"
                  placeholder="mxstbr"
                  value={this.props.username}
                  onChange={this.props.onChangeUsername}
                />
              </label>
            </Form>
            <ReposList {...reposListProps} />
          </Section>
        </div>
      </article>
    );
  }
}

const mapDispatchToProps: MapDispatchToPropsFunction<
  HomePageDispatchProps,
  HomePageProps
> = dispatch => ({
  onChangeUsername: evt =>
    dispatch(createChangeUsernameAction({ username: evt.target.value })),
  onSubmitForm: (evt = undefined) => {
    if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    dispatch(createLoadReposAction());
  },
});

const mapStateToProps: MapStateToProps<
  HomePageStateProps,
  HomePageProps,
  MyReducerState
> = createStructuredSelector({
  repos: makeSelectRepos(),
  username: makeSelectUsername(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

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
