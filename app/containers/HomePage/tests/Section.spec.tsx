import * as React from 'react';
import { render } from 'react-testing-library';
import 'react-testing-library/cleanup-after-each';

import Section from '../Section';

describe('<Section />', () => {
  it('should render an <section> tag', () => {
    const { container } = render(<Section />);
    expect((container.firstChild as Element).tagName).toEqual('SECTION');
  });

  it('should have a class attribute', () => {
    const { container } = render(<Section />);
    expect((container.firstChild as Element).hasAttribute('class')).toBe(true);
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const { container } = render(<Section id={id} />);
    expect((container.firstChild as Element).id).toEqual(id);
  });

  it('should not adopt an invalid attribute', () => {
    const Invalid: any = Section;
    const { container } = render(<Invalid attribute="test" />);
    expect((container.firstChild as Element).hasAttribute('attribute')).toBe(
      false,
    );
  });
});
