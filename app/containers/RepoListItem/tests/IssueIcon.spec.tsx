import * as React from 'react';
import { render } from 'react-testing-library';
import 'react-testing-library/cleanup-after-each';
import * as renderer from 'react-test-renderer';
import 'jest-styled-components';

import IssueIcon from '../parts/IssueIcon';

describe('<IssueIcon />', () => {
  it('should match the snapshot', () => {
    const renderedComponent = renderer.create(<IssueIcon />).toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should have a className attribute', () => {
    const { container } = render(<IssueIcon />);
    expect((container.firstChild as Element).hasAttribute('class')).toBe(true);
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const { container } = render(<IssueIcon id={id} />);
    expect((container.firstChild as Element).hasAttribute('id')).toBe(true);
    expect((container.firstChild as Element).id).toEqual(id);
  });

  it('should adopt any attribute', () => {
    const Invalid: any = IssueIcon;
    const { container } = render(<Invalid attribute="test" />);
    expect((container.firstChild as Element).hasAttribute('attribute')).toBe(
      true,
    );
  });
});
