import * as React from 'react';
import { render } from 'react-testing-library';
import 'react-testing-library/cleanup-after-each';

import Form from '../Form';

describe('<Form />', () => {
  it('should render an <form> tag', () => {
    const {
      container: { firstChild },
    } = render(<Form />);
    expect((firstChild as Element).tagName).toEqual('FORM');
  });

  it('should have a class attribute', () => {
    const {
      container: { firstChild },
    } = render(<Form />);
    expect((firstChild as Element).hasAttribute('class')).toBe(true);
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const {
      container: { firstChild },
    } = render(<Form id={id} />);
    expect((firstChild as Element).id).toEqual(id);
  });

  it('should not adopt an invalid attribute', () => {
    const Invalid: any = Form;
    const {
      container: { firstChild },
    } = render(<Invalid attribute="test" />);
    expect((firstChild as Element).hasAttribute('attribute')).toBe(false);
  });
});
