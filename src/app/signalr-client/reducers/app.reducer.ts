import {
  createFeatureSelector,
  MemoizedSelector,
  createSelector
} from '@ngrx/store';
import { AppActions, AppActionTypes } from '../app-actions/app.actions';
import { IAppState } from 'src/app/app.module';
import { ClientInfo } from '../Models/client-info';

export const appFeatureKey = 'appKey';
export const appStateSelector: MemoizedSelector<any, IAppState> = createFeatureSelector<IAppState>(appFeatureKey);
export const selectClientsInfos = createSelector(appStateSelector, (app) => app.clientsInfos);
export const selectIsServerOnline = createSelector(appStateSelector, (app) => app.isServerOnline);

export const appInitialState: IAppState = {
  isServerOnline: true,
  clientsInfos: []
}

export function AppReducer(state = appInitialState, action: AppActions | any): IAppState {
	switch (action.type) {
    case AppActionTypes.UPDATE_CLIENTS:
      {
        const newClientsInfo: ClientInfo[] = Boolean(action.payload.clientsInfos) ? action.payload.clientsInfos: state.clientsInfos;
        const isServerOnline: boolean = Boolean(action.payload.isServerOnline) ?true : false;
        return { ...state, clientsInfos: newClientsInfo , isServerOnline: isServerOnline };
      }
    default:
      return state;
    }
  }



