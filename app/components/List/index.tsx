import * as React from 'react';
import * as PropTypes from 'prop-types';

import Ul from './Ul';
import Wrapper from './Wrapper';
import { ListComponentFn } from './types';

const List: ListComponentFn = ({ component, items }) => {
  const ComponentToRender = component;
  let content: JSX.Element | JSX.Element[] = <div />;

  // If we have items, render them
  if (items) {
    content = items.map(item => (
      <ComponentToRender key={`item-${item.id}`} item={item} />
    ));
  } else {
    // Otherwise render a single component
    content = <ComponentToRender />;
  }

  return (
    <Wrapper>
      <Ul>{content}</Ul>
    </Wrapper>
  );
};

List.propTypes = {
  component: PropTypes.func.isRequired,
  items: PropTypes.array,
};

export default List;
