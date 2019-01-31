import * as React from 'react';
import { IntlProvider } from 'react-intl';
import { render } from 'react-testing-library';
import 'react-testing-library/cleanup-after-each';

import ArtistsList from '../index';
import { Artist } from '../../../graphql/types';

describe('<ReposList />', () => {
  it('should render the loading indicator when its loading', () => {
    const { container } = render(<ArtistsList loading />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render an error if loading failed', () => {
    const { queryByText } = render(
      <IntlProvider locale="en">
        <ArtistsList loading={false} error={{ message: 'Loading failed!' }} />
      </IntlProvider>,
    );
    expect(queryByText(/Something went wrong/)).not.toBeNull();
  });

  it('should render the repositories if loading was successful', () => {
    const artists: Artist[] = [
      {
        id: '3AQRLZ9PuTAozP28Skbq8V',
        name: 'The Script',
        image:
          'https://i.scdn.co/image/15913ff470e612866f0f32179a225cacf546b4a7',
        albums: [
          {
            id: '3W9NClLDhTHyRmy8ZLfoJf',
            name: 'Freedom Child',
          },
        ],
      },
    ];
    const { container } = render(
      <IntlProvider locale="en">
        <ArtistsList artists={artists} error={null} />
      </IntlProvider>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should not render anything if nothing interesting is provided', () => {
    const { container } = render(<ArtistsList error={null} loading={false} />);

    expect(container.firstChild).toBeNull();
  });
});
