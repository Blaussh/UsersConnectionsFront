import { ClientInfo } from './client-info';

export interface ServerData {
  clientsInfos: ClientInfo[],
  isServerOnline: Boolean
}
