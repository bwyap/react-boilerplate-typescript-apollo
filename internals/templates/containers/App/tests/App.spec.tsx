import * as React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';

import { App } from '../index';
import { mapStateToProps } from '../parts/App';
import { MyReducerState } from '../../../typings/store';
import { AppStateProps } from '../types';

const renderer = createRenderer();

describe('<App />', () => {
  it('should render and match the snapshot', () => {
    renderer.render(<App />);
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });

  describe('mapStateToProps', () => {
    it('selects the pathname from state', () => {
      const state: MyReducerState = {
        app: null,
        language: null,
        router: { location: { pathname: 'path' } as any } as any,
      };
      const result: AppStateProps = mapStateToProps(state, {});
      expect(result).toEqual({ pathname: 'path' });
    });
  });
});
