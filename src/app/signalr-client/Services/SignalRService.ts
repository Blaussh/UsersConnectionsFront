import { Injectable } from "@angular/core";
import {
  HttpTransportType,
  HubConnectionBuilder,
  HubConnection
} from "@aspnet/signalr";
import { Store } from "@ngrx/store";
import { ClientInfo } from "../Models/client-info";
import { IAppState } from "src/app/app.module";
import { DeviceDetectorService } from 'ngx-device-detector';
import { TimeUpdater } from '../Models/time-updater';
import { UpdateServerData } from '../app-actions/app.actions';

@Injectable({
  providedIn: "root"
})
export class SignalRService {
  constructor(protected store$: Store<IAppState>, private deviceService: DeviceDetectorService) {
    this.startConnection();
    this.addTransferClientDataListener();
  }

  deviceInfo = null;
  public data: string;
  public bradcastedData: string;
  private _ipAddress: string;
  private hubConnection: HubConnection;

  public startConnection = () => {
    let hubConnectionUrl = window.location.origin.toString();
    hubConnectionUrl = hubConnectionUrl.replace("4200", "5000/message");
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(hubConnectionUrl, {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets
      })
      .build();

    this.hubConnection
      .start()
      .then(() => {
        console.log("Connection started");
        setInterval(() => {
          const currentTime = `${this.checkTime(new Date().getHours())}:${this.checkTime(new Date().getMinutes())}:${this.checkTime(new Date().getSeconds())}`;
          this.hubConnection.invoke("yoYoTime", <TimeUpdater>{
            currentTime: currentTime,
            ipAddress: this._ipAddress
          })
         .catch(err => console.error(err));
        }, 1000);
        this.addClientData();
      })
      .catch(err => {
        this.store$.dispatch(new UpdateServerData({ isServerOnline: false }));
        console.log("Error while starting connection: " + err)
      });
  };

  public addTransferClientDataListener = () => {
    this.hubConnection.on("send", data => {
      data.sort((a, b) => {
        const num1 = Number(a.ipAddress.split(".").map((num) => (`000${num}`).slice(-3) ).join(""));
        const num2 = Number(b.ipAddress.split(".").map((num) => (`000${num}`).slice(-3) ).join(""));
        return num1-num2;
      });
      this.store$.dispatch(new UpdateServerData({ clientsInfos: data, isServerOnline: true }));
    });
  };

  public addClientData = () => {
    var timezone = new Date().getTimezoneOffset();
    var currentTime = `${this.checkTime(new Date().getHours())}:${this.checkTime(new Date().getMinutes())}:${this.checkTime(new Date().getSeconds())}`;
    this._ipAddress = `10.0.0.${Math.floor(Math.random() * 20)}`;
    this.hubConnection
      .invoke("addClient", <ClientInfo>{
        currentTime: currentTime,
        timezoneOffset: (timezone/60).toString(),
        ipAddress: this._ipAddress,
        os: `${this.deviceService.os}, ver: ${this.deviceService.os_version}`,
        browser: `${this.deviceService.browser}`,
        resolution: `${Math.round(
          window.screen.width * window.devicePixelRatio
        )}X${Math.round(window.screen.height * window.devicePixelRatio)}`
      })
      .catch(err => console.error(err));
  };

  public checkTime(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }
}
