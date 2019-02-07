import * as React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

/**
 * This decorator wraps the story in a Router.
 */

export default story => {
  return <Router history={createMemoryHistory()}>{story()}</Router>;
};
