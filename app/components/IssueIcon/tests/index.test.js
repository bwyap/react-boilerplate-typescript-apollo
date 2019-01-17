import React from 'react';
import { render } from 'react-testing-library';
import 'react-testing-library/cleanup-after-each';

import IssueIcon from '../index';

describe('<IssueIcon />', () => {
  it('should render a SVG', () => {
    const { container } = render(<IssueIcon />);
    expect(container.querySelector('svg')).not.toBeNull();
  });
});
