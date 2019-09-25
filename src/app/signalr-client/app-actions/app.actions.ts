import { Action } from '@ngrx/store';
import { ClientInfo } from '../Models/client-info';
import { ServerData } from '../Models/server-data';

export const AppActionTypes = {
  UPDATE_CLIENTS: 'UPDATE_CLIENTS'
};

export type AppActions =
  UpdateServerData;

export class UpdateServerData implements Action {
	type = AppActionTypes.UPDATE_CLIENTS;

	constructor(public payload?: { clientsInfos?: ClientInfo[], isServerOnline?: boolean }) {
	}
}
