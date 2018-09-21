import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '../reducers/signin.reducer';

const getState = createFeatureSelector<State>('signin');

export const getProcessing = createSelector(getState, state => state.processing);
