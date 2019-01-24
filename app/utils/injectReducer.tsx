import * as React from 'react';
import * as PropTypes from 'prop-types';
import hoistNonReactStatics from './hoistNonReactStatics';

import getInjectors from './reducerInjectors';
import { ReducerInjectorFn } from '../typings/utils';

/**
 * Dynamically injects a reducer
 *
 * @param {string} key A key of the reducer
 * @param {function} reducer A reducer that will be injected
 *
 */
const injectReducer: ReducerInjectorFn = ({
  key,
  reducer,
}) => WrappedComponent => {
  class ReducerInjector extends React.Component {
    public static displayName = `withReducer(${WrappedComponent.displayName ||
      WrappedComponent.name ||
      'Component'})`;

    public static contextTypes = {
      store: PropTypes.object.isRequired,
    };

    public static WrappedComponent = WrappedComponent;

    constructor(props: any, context: any) {
      super(props, context);

      getInjectors(context.store).injectReducer(key, reducer);
    }

    public render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return hoistNonReactStatics(ReducerInjector, WrappedComponent);
};

export default injectReducer;
