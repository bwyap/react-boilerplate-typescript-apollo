import * as React from 'react';
import { render } from 'react-testing-library';
import 'react-testing-library/cleanup-after-each';

import Input from '../parts/Input';

describe('<Input />', () => {
  it('should render an <input> tag', () => {
    const { container } = render(<Input />);
    expect((container.firstChild as Element).tagName).toEqual('INPUT');
  });

  it('should have a class attribute', () => {
    const { container } = render(<Input />);
    expect((container.firstChild as Element).hasAttribute('class')).toBe(true);
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const { container } = render(<Input id={id} />);
    expect((container.firstChild as Element).id).toEqual(id);
  });

  it('should not adopt an invalid attribute', () => {
    const Invalid: any = Input;
    const { container } = render(<Invalid attribute="test" />);
    expect((container.firstChild as Element).hasAttribute('attribute')).toBe(
      false,
    );
  });
});
