import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromSignin from './signin.reducer';

export interface AppState {
  signin: fromSignin.State;
}

export const reducers: ActionReducerMap<AppState> = {
  signin: fromSignin.reducer
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
