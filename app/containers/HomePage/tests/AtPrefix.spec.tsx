import * as React from 'react';
import { render } from 'react-testing-library';
import 'react-testing-library/cleanup-after-each';

import AtPrefix from '../AtPrefix';

describe('<AtPrefix />', () => {
  it('should render an <span> tag', () => {
    const {
      container: { firstChild },
    } = render(<AtPrefix />);
    expect((firstChild as Element).tagName).toEqual('SPAN');
  });

  it('should have a class attribute', () => {
    const {
      container: { firstChild },
    } = render(<AtPrefix />);
    expect((firstChild as Element).hasAttribute('class')).toBe(true);
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const {
      container: { firstChild },
    } = render(<AtPrefix id={id} />);
    expect((firstChild as Element).id).toEqual(id);
  });

  it('should not adopt an invalid attribute', () => {
    const Invalid: any = AtPrefix;
    const {
      container: { firstChild },
    } = render(<Invalid attribute="test" />);
    expect((firstChild as Element).hasAttribute('attribute')).toBe(false);
  });
});
