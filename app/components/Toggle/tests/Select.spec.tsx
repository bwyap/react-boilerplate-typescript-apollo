import * as React from 'react';
import { render } from 'react-testing-library';
import 'react-testing-library/cleanup-after-each';

import Select from '../Select';

describe('<Select />', () => {
  it('should render an <select> tag', () => {
    const { container } = render(<Select />);
    expect((container.firstChild as Element).tagName).toEqual('SELECT');
  });

  it('should have a class attribute', () => {
    const { container } = render(<Select />);
    expect((container.firstChild as Element).hasAttribute('class')).toBe(true);
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const { container } = render(<Select id={id} />);
    expect((container.firstChild as Element).id).toEqual(id);
  });

  it('should not adopt an invalid attribute', () => {
    const Invalid: any = Select;
    const { container } = render(<Invalid attribute="test" />);
    expect((container.firstChild as Element).hasAttribute('attribute')).toBe(
      false,
    );
  });
});
