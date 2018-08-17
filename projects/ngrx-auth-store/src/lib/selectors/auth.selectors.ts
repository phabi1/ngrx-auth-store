import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '../reducers/auth.reducer';
import { AUTH_STATE_KEY } from '../utils';

const getAuthState = createFeatureSelector<State>(AUTH_STATE_KEY);

export const getAuthenticating = createSelector(getAuthState, state => state.authenticating);
export const getAuthenticated = createSelector(getAuthState, state => state.authenticated);
export const getIdentity = createSelector(getAuthState, state => state.identity);
export const getHasIdentity = createSelector(getAuthState, state => {
  if (state.identity && state.identity.uid) {
    return true;
  }
  return false;
});
export const getRedirectUrl = createSelector(getAuthState, state => state.redirectUrl);
