import * as React from 'react';
import * as PropTypes from 'prop-types';
import hoistNonReactStatics from './hoistNonReactStatics';

import getInjectors from './sagaInjectors';
import { SagaInjectionHandlers } from '../typings/store';
import { SagaInjectorFn } from '../typings/utils';

/**
 * Dynamically injects a saga, passes component's props as saga arguments
 *
 * @param {string} key A key of the saga
 * @param {function} saga A root saga that will be injected
 * @param {string} [mode] By default (constants.DAEMON) the saga will be started
 * on component mount and never canceled or started again. Another two options:
 *   - constants.RESTART_ON_REMOUNT — the saga will be started on component mount and
 *   cancelled with `task.cancel()` on component unmount for improved performance,
 *   - constants.ONCE_TILL_UNMOUNT — behaves like 'RESTART_ON_REMOUNT' but never runs it again.
 *
 */
const injectSaga: SagaInjectorFn = ({
  key,
  saga,
  mode,
}) => WrappedComponent => {
  class InjectSaga extends React.Component {
    public static displayName = `withSaga(${WrappedComponent.displayName ||
      WrappedComponent.name ||
      'Component'})`;

    public static contextTypes = {
      store: PropTypes.object.isRequired,
    };

    public static WrappedComponent: React.ComponentType = WrappedComponent;

    private injectors: SagaInjectionHandlers;

    constructor(props: any, context: any) {
      super(props, context);

      this.injectors = getInjectors(context.store);

      this.injectors.injectSaga(key, { saga, mode }, this.props);
    }

    public componentWillUnmount() {
      this.injectors.ejectSaga(key);
    }

    public render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return hoistNonReactStatics(InjectSaga, WrappedComponent);
};

export default injectSaga;
