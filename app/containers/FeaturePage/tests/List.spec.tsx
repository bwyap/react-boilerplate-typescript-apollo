import * as React from 'react';
import { render } from 'react-testing-library';
import 'react-testing-library/cleanup-after-each';

import List from '../List';

describe('<List />', () => {
  it('should render an <ul> tag', () => {
    const {
      container: { firstChild },
    } = render(<List />);
    expect((firstChild as Element).tagName).toEqual('UL');
  });

  it('should have a class attribute', () => {
    const {
      container: { firstChild },
    } = render(<List />);
    expect((firstChild as Element).hasAttribute('class')).toBe(true);
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const {
      container: { firstChild },
    } = render(<List id={id} />);
    expect((firstChild as Element).id).toEqual(id);
  });

  it('should not adopt an invalid attribute', () => {
    const Invalid: any = List;
    const {
      container: { firstChild },
    } = render(<Invalid attribute="test" />);
    expect((firstChild as Element).hasAttribute('attribute')).toBe(false);
  });
});
