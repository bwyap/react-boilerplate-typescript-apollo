import * as React from 'react';
import { render } from 'react-testing-library';
import 'react-testing-library/cleanup-after-each';

import Wrapper from '../parts/Wrapper';

describe('<Wrapper />', () => {
  it('should render an <footer> tag', () => {
    const { container } = render(<Wrapper />);
    expect(container.querySelector('footer')).not.toBeNull();
  });

  it('should have a class attribute', () => {
    const { container } = render(<Wrapper />);
    expect(container.querySelector('footer').hasAttribute('class')).toBe(true);
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const { container } = render(<Wrapper id={id} />);
    expect(container.querySelector('footer').id).toEqual(id);
  });

  it('should not adopt an invalid attribute', () => {
    const Invalid: any = Wrapper;
    const { container } = render(<Invalid attribute="test" />);
    expect(
      container.querySelector('footer').getAttribute('attribute'),
    ).toBeNull();
  });
});
