/**
 * hoist-non-react-statics
 *
 * Taken from https://github.com/mridgway/hoist-non-react-statics
 * Date: 18 Jan 2019
 *
 * Copied implementation from package because of import issues with Typescript.
 *
 */

import * as ReactIs from 'react-is';

const REACT_STATICS = {
  childContextTypes: true,
  contextType: true,
  contextTypes: true,
  defaultProps: true,
  displayName: true,
  getDefaultProps: true,
  getDerivedStateFromProps: true,
  mixins: true,
  propTypes: true,
  type: true,
};

const KNOWN_STATICS = {
  name: true,
  length: true,
  prototype: true,
  caller: true,
  callee: true,
  arguments: true,
  arity: true,
};

const FORWARD_REF_STATICS = {
  $$typeof: true,
  render: true,
};

const TYPE_STATICS = {};
TYPE_STATICS[ReactIs.ForwardRef] = FORWARD_REF_STATICS;

const defineProperty = Object.defineProperty;
const getOwnPropertyNames = Object.getOwnPropertyNames;
const getOwnPropertySymbols = Object.getOwnPropertySymbols;
const getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
const getPrototypeOf = Object.getPrototypeOf;
const objectPrototype = Object.prototype;

export default function hoistNonReactStatics(
  targetComponent: any,
  sourceComponent: any,
  blacklist: any[] = [],
) {
  if (typeof sourceComponent !== 'string') {
    // don't hoist over string (html) components

    if (objectPrototype) {
      const inheritedComponent = getPrototypeOf(sourceComponent);
      if (inheritedComponent && inheritedComponent !== objectPrototype) {
        hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
      }
    }

    let keys = getOwnPropertyNames(sourceComponent);

    if (getOwnPropertySymbols) {
      keys = keys.concat(
        getOwnPropertySymbols(sourceComponent).map(v => v.toString()),
      );
    }

    const targetStatics =
      TYPE_STATICS[(targetComponent as any).$$typeof] || REACT_STATICS;
    const sourceStatics =
      TYPE_STATICS[(sourceComponent as any).$$typeof] || REACT_STATICS;

    for (const key of keys) {
      if (
        !KNOWN_STATICS[key] &&
        !(blacklist && blacklist[key]) &&
        !(sourceStatics && sourceStatics[key]) &&
        !(targetStatics && targetStatics[key])
      ) {
        const descriptor = getOwnPropertyDescriptor(sourceComponent, key);
        try {
          // Avoid failures from read-only properties
          defineProperty(targetComponent, key, descriptor);
        } catch (e) {
          //
        }
      }
    }

    return targetComponent;
  }

  return targetComponent;
}
