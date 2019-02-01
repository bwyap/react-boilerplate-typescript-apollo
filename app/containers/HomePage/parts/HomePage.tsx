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
import { withApollo } from 'react-apollo';

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
import {
  createChangeUsernameAction,
  createChangeSearchAction,
} from '../store/actions';
import { makeSelectUsername, makeSelectSearch } from '../store/selectors';
import reducer from '../store/reducer';
import saga from '../store/saga';
import {
  HomePageMergedProps,
  HomePageDispatchProps,
  HomePageProps,
  HomePageStateProps,
} from '../types';
import { MyReducerState } from '../../../typings/store';

import { SearchArtists } from '../../../graphql/gql/search';
import ArtistsList from '../../../components/ArtistsList';

export class HomePage extends React.PureComponent<HomePageMergedProps> {
  static propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.object,
    repos: PropTypes.array,
    onSubmitForm: PropTypes.func,
    username: PropTypes.string,
    search: PropTypes.string,
    onChangeUsername: PropTypes.func,
    onChangeSearch: PropTypes.func,
  };

  state = {
    loading: false,
    error: null,
    artists: null,
  };

  /**
   * when initial state username is not null, submit the form to load repos
   */
  async componentDidMount() {
    const { searchArtists } = this;
    const { username, onSubmitForm, search } = this.props;
    if (username && username.trim().length > 0) {
      onSubmitForm();
    }
    if (search && search.trim().length > 0) {
      await searchArtists();
    }
  }

  searchArtists = async (evt: React.SyntheticEvent = undefined) => {
    if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    try {
      const { client } = this.props;
      this.setState({ loading: true, error: null });
      const result = await client.query<{ queryArtists: object[] }>({
        query: SearchArtists,
        variables: { byName: this.props.search },
      });
      this.setState({ loading: false, artists: result.data.queryArtists });
    } catch (error) {
      this.setState({ loading: false, error });
    }
  };

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
          <Section>
            <H2>
              <FormattedMessage {...messages.trymeSearchHeader} />
            </H2>
            <Form onSubmit={this.searchArtists}>
              <label htmlFor="search">
                <FormattedMessage {...messages.trymeSearchMessage} />
                :&nbsp;
                <Input
                  id="search"
                  type="text"
                  placeholder="the script"
                  value={this.props.search}
                  onChange={this.props.onChangeSearch}
                />
              </label>
            </Form>
            <ArtistsList {...this.state} />
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
  onChangeSearch: evt =>
    dispatch(createChangeSearchAction({ search: evt.target.value })),
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
  search: makeSelectSearch(),
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
  withApollo,
)(HomePage);

export { mapDispatchToProps };
