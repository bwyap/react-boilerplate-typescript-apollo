import * as React from 'react';
import * as PropTypes from 'prop-types';

import Item from './Item';
import Wrapper from './Wrapper';

const ListItem = props => (
  <Wrapper>
    <Item>{props.item}</Item>
  </Wrapper>
);

(ListItem as any).propTypes = {
  item: PropTypes.any,
};

export default ListItem;
