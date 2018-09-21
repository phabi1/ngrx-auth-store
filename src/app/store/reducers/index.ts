import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromAuth from 'ngrx-auth-store';
import * as fromSignin from './signin.reducer';

export interface AppState {
  auth: fromAuth.State;
  signin: fromSignin.State;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: fromAuth.reducer,
  signin: fromSignin.reducer
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
