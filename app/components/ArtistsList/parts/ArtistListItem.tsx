/**
 * ArtistListItem
 *
 * Lists the name and the number of albums by an artist
 */

import * as React from 'react';
import * as PropTypes from 'prop-types';

import ListItem from '../../../components/ListItem';
import { ArtistListItemComponentFn } from '../types';

export const ArtistListItem: ArtistListItemComponentFn = ({ item: artist }) => {
  const content = (
    <>
      {artist.name} ({artist.albums.length} album
      {artist.albums.length === 1 ? '' : 's'})
    </>
  );

  // Render the content into a list item
  return <ListItem key={`artist-list-item-${artist.name}`} item={content} />;
};

ArtistListItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string,
    albums: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
      }),
    ),
  }),
};

export default ArtistListItem;
