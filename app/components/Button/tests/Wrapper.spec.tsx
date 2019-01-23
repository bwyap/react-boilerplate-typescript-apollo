import * as React from 'react';
import { render } from 'react-testing-library';
import 'react-testing-library/cleanup-after-each';

import Wrapper from '../parts/Wrapper';

describe('<Wrapper />', () => {
  it('should render an <div> tag', () => {
    const { container } = render(<Wrapper />);
    expect(container.querySelector('div')).not.toBeNull();
  });

  it('should have a class attribute', () => {
    const { container } = render(<Wrapper />);
    expect(container.querySelector('div').hasAttribute('class')).toBe(true);
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const { container } = render(<Wrapper id={id} />);
    expect(container.querySelector('div').id).toEqual(id);
  });

  it('should not adopt an invalid attribute', () => {
    const Invalid: any = Wrapper;
    const { container } = render(<Invalid attribute="test" />);
    expect(container.querySelector('div[attribute="test"]')).toBeNull();
  });
});
