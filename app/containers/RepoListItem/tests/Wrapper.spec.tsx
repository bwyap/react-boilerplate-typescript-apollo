import * as React from 'react';
import { render } from 'react-testing-library';
import 'react-testing-library/cleanup-after-each';

import Wrapper from '../Wrapper';

describe('<Wrapper />', () => {
  it('should render an <div> tag', () => {
    const { container } = render(<Wrapper />);
    expect((container.firstChild as Element).tagName).toEqual('DIV');
  });

  it('should have a className attribute', () => {
    const { container } = render(<Wrapper />);
    expect((container.firstChild as Element).hasAttribute('class')).toBe(true);
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const { container } = render(<Wrapper id={id} />);
    expect((container.firstChild as Element).hasAttribute('id')).toBe(true);
    expect((container.firstChild as Element).id).toEqual(id);
  });

  it('should not adopt an invalid attribute', () => {
    const Invalid: any = Wrapper;
    const { container } = render(<Invalid attribute="test" />);
    expect((container.firstChild as Element).hasAttribute('attribute')).toBe(
      false,
    );
  });
});
