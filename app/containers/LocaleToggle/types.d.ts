/**
 *
 * LocaleToggle type definitions
 *
 */

import { Dispatch } from 'redux';

// Props that should be passed to LocaleToggle manually
export interface LocaleToggleProps {}

// Props that should be passed to LocaleToggle through MapDispatchToProps
export interface LocaleToggleDispatchProps {
  onLocaleToggle(evt: any): void;
}

// Props that should be passed to LocaleToggle through MapStateToProps
export interface LocaleToggleStateProps {
  locale: string;
}

// All props that are passed to LocaleToggle
export interface LocaleToggleMergedProps
  extends LocaleToggleProps,
    LocaleToggleDispatchProps,
    LocaleToggleStateProps {}
