import {beforeAll, beforeEach, describe, expect, vi} from 'vitest';
import browserHistory from '../../browser-history';
import {configureMockStore, MockStore} from '@jedmao/redux-mock-store';
import {redirect} from './redirect.ts';
import {AnyAction} from '@reduxjs/toolkit';
import {State} from '../../types/state.ts';
import {redirectToRoute} from '../action.ts';
import {AppRoute} from '../../components/app/const.ts';

vi.mock('../../browser-history', () => ({
  default: {
    location: {pathname: ''},
    push(path: string) {
      this.location.pathname = path;
    }
  }
}));

describe('Redirect middleware', () => {
  let store: MockStore;

  beforeAll(() => {
    const middleware = [redirect];
    const mockStoreCreator = configureMockStore<State, AnyAction>(middleware);
    store = mockStoreCreator();
  });

  beforeEach(() => {
    browserHistory.push('');
  });

  it('should redirect to "/login" with redirectToRoute action', () => {
    const redirectAction = redirectToRoute(AppRoute.Login) ;
    store.dispatch(redirectAction);
    expect(browserHistory.location.pathname).toBe(AppRoute.Login);
  });
});
