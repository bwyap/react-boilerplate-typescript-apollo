import * as React from 'react';
import { render } from 'react-testing-library';
import 'react-testing-library/cleanup-after-each';

import ListItem from '../ListItem';

describe('<ListItem />', () => {
  it('should render an <li> tag', () => {
    const {
      container: { firstChild },
    } = render(<ListItem />);
    expect((firstChild as Element).tagName).toEqual('LI');
  });

  it('should have a class attribute', () => {
    const {
      container: { firstChild },
    } = render(<ListItem />);
    expect((firstChild as Element).hasAttribute('class')).toBe(true);
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const {
      container: { firstChild },
    } = render(<ListItem id={id} />);
    expect((firstChild as Element).id).toEqual(id);
  });

  it('should not adopt an invalid attribute', () => {
    const Invalid: any = ListItem;
    const {
      container: { firstChild },
    } = render(<Invalid attribute="test" />);
    expect((firstChild as Element).hasAttribute('attribute')).toBe(false);
  });
});
