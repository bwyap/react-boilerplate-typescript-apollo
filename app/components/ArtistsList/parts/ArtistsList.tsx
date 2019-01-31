import * as React from 'react';
import * as PropTypes from 'prop-types';

import List from '../../../components/List';
import ListItem from '../../../components/ListItem';
import LoadingIndicator from '../../../components/LoadingIndicator';
import { ArtistsListComponentFn } from '../types';
import { ArtistListItem } from './ArtistListItem';

const ArtistsList: ArtistsListComponentFn = ({
  loading = false,
  error = null,
  artists = null,
}) => {
  if (loading) {
    return <List component={LoadingIndicator} />;
  }

  if (error) {
    const ErrorComponent = () => (
      <ListItem item="Something went wrong, please try again!" />
    );
    return <List component={ErrorComponent} />;
  }

  if (artists) {
    return <List items={artists} component={ArtistListItem} />;
  }

  return null;
};

ArtistsList.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  artists: PropTypes.arrayOf((ArtistListItem.propTypes as any).item),
};

export default ArtistsList;
