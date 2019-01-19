import * as React from 'react';
import { render } from 'react-testing-library';
import 'react-testing-library/cleanup-after-each';
import * as renderer from 'react-test-renderer';
import 'jest-styled-components';

import RepoLink from '../RepoLink';

describe('<RepoLink />', () => {
  it('should match the snapshot', () => {
    const renderedComponent = renderer.create(<RepoLink />).toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should have a className attribute', () => {
    const { container } = render(<RepoLink />);
    expect((container.firstChild as Element).hasAttribute('class')).toBe(true);
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const { container } = render(<RepoLink id={id} />);
    expect((container.firstChild as Element).hasAttribute('id')).toBe(true);
    expect((container.firstChild as Element).id).toEqual(id);
  });

  it('should not adopt an invalid attribute', () => {
    const Invalid: any = RepoLink;
    const { container } = render(<Invalid attribute="test" />);
    expect((container.firstChild as Element).hasAttribute('attribute')).toBe(
      false,
    );
  });
});
