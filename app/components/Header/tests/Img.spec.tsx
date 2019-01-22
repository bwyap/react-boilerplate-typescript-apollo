import * as React from 'react';
import { render } from 'react-testing-library';
import 'react-testing-library/cleanup-after-each';
import * as renderer from 'react-test-renderer';
import 'jest-styled-components';

import Img from '../Img';

describe('<Img />', () => {
  it('should match the snapshot', () => {
    const renderedComponent = renderer
      .create(<Img src="http://example.com/test.jpg" alt="test" />)
      .toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should have a class attribute', () => {
    const { container } = render(
      <Img src="http://example.com/test.jpg" alt="test" />,
    );
    expect(container.querySelector('img').hasAttribute('class')).toBe(true);
  });

  it('should adopt a valid attribute', () => {
    const { container } = render(
      <Img src="http://example.com/test.jpg" alt="test" />,
    );
    expect(container.querySelector('img').alt).toEqual('test');
  });

  it('should not adopt an invalid attribute', () => {
    const Invalid: any = Img;
    const { container } = render(
      <Invalid src="http://example.com/test.jpg" attribute="test" alt="test" />,
    );
    expect(container.querySelector('img').getAttribute('attribute')).toBeNull();
  });
});
