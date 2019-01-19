import * as React from 'react';
import { render } from 'react-testing-library';
import 'react-testing-library/cleanup-after-each';

import Circle from '../Circle';

describe('<Circle />', () => {
  it('should render an <div> tag', () => {
    const { container } = render(<Circle />);
    expect((container.firstChild as Element).tagName).toEqual('DIV');
  });

  it('should have a class attribute', () => {
    const { container } = render(<Circle />);
    expect((container.firstChild as Element).hasAttribute('class')).toBe(true);
  });

  it('should not adopt attributes', () => {
    const id = 'test';
    const { container } = render(<Circle id={id} />);
    expect((container.firstChild as Element).hasAttribute('id')).toBe(false);
  });
});
