import * as React from 'react';
import * as PropTypes from 'prop-types';

import List from '../../components/List';
import ListItem from '../../components/ListItem';
import LoadingIndicator from '../../components/LoadingIndicator';
import RepoListItem from '../../containers/RepoListItem';

const ReposList = ({ loading = false, error = null, repos = null }) => {
  if (loading) {
    return <List component={LoadingIndicator} />;
  }

  if (error) {
    const ErrorComponent = () => (
      <ListItem item="Something went wrong, please try again!" />
    );
    return <List component={ErrorComponent} />;
  }

  if (repos) {
    return <List items={repos} component={RepoListItem} />;
  }

  return null;
};

(ReposList as any).propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  repos: PropTypes.any,
};

export default ReposList;
