import { gql } from 'apollo-boost';

export const SearchArtists = gql`
  query SearchArtists($byName: String!) {
    queryArtists(byName: $byName) {
      id
      name
      image
      albums {
        id
        name
      }
    }
  }
`;
