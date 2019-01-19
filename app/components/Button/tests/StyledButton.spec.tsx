import * as React from 'react';
import { render } from 'react-testing-library';
import 'react-testing-library/cleanup-after-each';

import StyledButton from '../StyledButton';

describe('<StyledButton />', () => {
  it('should render an <button> tag', () => {
    const { container } = render(<StyledButton />);
    expect(container.querySelector('button')).not.toBeNull();
  });

  it('should have a class attribute', () => {
    const { container } = render(<StyledButton />);
    expect(container.querySelector('button').hasAttribute('class')).toBe(true);
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const { container } = render(<StyledButton id={id} />);
    expect(container.querySelector('button').id).toEqual(id);
  });

  it('should not adopt an invalid attribute', () => {
    const Invalid: any = StyledButton;
    const { container } = render(<Invalid attribute="test" />);
    expect(container.querySelector('button[attribute="test"]')).toBeNull();
  });
});
