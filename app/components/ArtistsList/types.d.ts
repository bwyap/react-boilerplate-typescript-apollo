import { FunctionalComponent } from '../../typings/component';
import { Artist } from '../../graphql/types';

export interface ArtistsListComponentFn
  extends FunctionalComponent<ArtistsListProps> {}

export interface ArtistsListProps {
  loading?: boolean;
  error?: any;
  artists?: Artist[];
}

export interface ArtistListItemComponentFn
  extends FunctionalComponent<ArtistListItemProps> {}

export interface ArtistListItemProps {
  item: Artist;
}
