import * as React from 'react';
import { render } from 'react-testing-library';
import 'react-testing-library/cleanup-after-each';

import CenteredSection from '../parts/CenteredSection';

describe('<CenteredSection />', () => {
  it('should render an <section> tag', () => {
    const {
      container: { firstChild },
    } = render(<CenteredSection />);
    expect((firstChild as Element).tagName).toEqual('SECTION');
  });

  it('should have a class attribute', () => {
    const {
      container: { firstChild },
    } = render(<CenteredSection />);
    expect((firstChild as Element).hasAttribute('class')).toBe(true);
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const {
      container: { firstChild },
    } = render(<CenteredSection id={id} />);
    expect((firstChild as Element).id).toEqual(id);
  });

  it('should not adopt an invalid attribute', () => {
    const Invalid: any = CenteredSection;
    const {
      container: { firstChild },
    } = render(<Invalid attribute="test" />);
    expect((firstChild as Element).hasAttribute('attribute')).toBe(false);
  });
});
