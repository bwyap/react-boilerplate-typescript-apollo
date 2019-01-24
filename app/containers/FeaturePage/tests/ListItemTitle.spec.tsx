import * as React from 'react';
import { render } from 'react-testing-library';
import 'react-testing-library/cleanup-after-each';

import ListItemTitle from '../parts/ListItemTitle';

describe('<ListItemTitle />', () => {
  it('should render an <p> tag', () => {
    const {
      container: { firstChild },
    } = render(<ListItemTitle />);
    expect((firstChild as Element).tagName).toEqual('P');
  });

  it('should have a class attribute', () => {
    const {
      container: { firstChild },
    } = render(<ListItemTitle />);
    expect((firstChild as Element).hasAttribute('class')).toBe(true);
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const {
      container: { firstChild },
    } = render(<ListItemTitle id={id} />);
    expect((firstChild as Element).id).toEqual(id);
  });

  it('should not adopt an invalid attribute', () => {
    const Invalid: any = ListItemTitle;
    const {
      container: { firstChild },
    } = render(<Invalid attribute="test" />);
    expect((firstChild as Element).hasAttribute('attribute')).toBe(false);
  });
});
