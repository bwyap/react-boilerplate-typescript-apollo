/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 */

import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import messages from '../messages';

class NotFoundPage extends React.PureComponent {
  render = () => (
    <div>
      <h1>
        <FormattedMessage {...messages.header} />
      </h1>
    </div>
  );
}

export default NotFoundPage;
