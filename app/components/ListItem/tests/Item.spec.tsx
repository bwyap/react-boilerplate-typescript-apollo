import * as React from 'react';
import { render } from 'react-testing-library';
import 'react-testing-library/cleanup-after-each';

import Item from '../parts/Item';

describe('<Item />', () => {
  it('should render an <div> tag', () => {
    const { container } = render(<Item />);
    expect((container.firstChild as Element).tagName).toEqual('DIV');
  });

  it('should have a class attribute', () => {
    const { container } = render(<Item />);
    expect((container.firstChild as Element).hasAttribute('class')).toBe(true);
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const { container } = render(<Item id={id} />);
    expect((container.firstChild as Element).hasAttribute('id')).toBe(true);
    expect((container.firstChild as Element).id).toEqual(id);
  });

  it('should not adopt an invalid attribute', () => {
    const Invalid: any = Item;
    const { container } = render(<Invalid attribute="test" />);
    expect((container.firstChild as Element).hasAttribute('attribute')).toBe(
      false,
    );
  });
});
