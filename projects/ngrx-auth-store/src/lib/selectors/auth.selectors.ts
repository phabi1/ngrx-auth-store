import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { Identity } from '../interfaces/identity';
import { State } from '../reducers/auth.reducer';
import { AUTH_STATE_KEY } from '../utils';

export const getAuthState: MemoizedSelector<any, State> = createFeatureSelector<State>(AUTH_STATE_KEY);

export const getAuthenticating: MemoizedSelector<State, boolean> = createSelector(getAuthState, state => state.authenticating);
export const getAuthenticated: MemoizedSelector<State, boolean> = createSelector(getAuthState, state => state.authenticated);
export const getToken: MemoizedSelector<State, string> = createSelector(getAuthState, state => state.token);
export const getRefreshToken: MemoizedSelector<State, string> = createSelector(getAuthState, state => state.refreshToken);
export const getIdentity: MemoizedSelector<State, Identity> = createSelector(getAuthState, state => state.identity);
export const getHasIdentity: MemoizedSelector<State, boolean> = createSelector(getAuthState, state => {
  if (state.identity && state.identity.uid) {
    return true;
  }
  return false;
});
export const getRedirectUrl: MemoizedSelector<State, string> = createSelector(getAuthState, state => state.redirectUrl);
