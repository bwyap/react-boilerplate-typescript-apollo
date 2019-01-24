import * as React from 'react';
import * as PropTypes from 'prop-types';

import Item from './Item';
import Wrapper from './Wrapper';
import { ListItemComponentFn } from '../types';

const ListItem: ListItemComponentFn = ({ item }) => (
  <Wrapper>
    <Item>{item}</Item>
  </Wrapper>
);

ListItem.propTypes = {
  item: PropTypes.any,
};

export default ListItem;
