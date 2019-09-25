import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { AppComponent } from './signalr-client/app-component/app.component';
import { AppReducer, appFeatureKey } from './signalr-client/reducers/app.reducer';
import { ClientsComponent } from './clients/clients.component';
import { ClientComponent } from './client/client.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatGridListModule, MatCardModule } from '@angular/material';
import { ClientInfo } from './signalr-client/Models/client-info';
import { DeviceDetectorModule } from 'ngx-device-detector';

export interface IAppState {
  clientsInfos: ClientInfo[];
  isServerOnline: boolean;
}

@NgModule({
  declarations: [
    AppComponent,
    ClientsComponent,
    ClientComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    StoreModule.forRoot({[appFeatureKey]: AppReducer}),
    StoreDevtoolsModule.instrument({
      maxAge: 10
    }),
    MatGridListModule,
    MatCardModule,
    DeviceDetectorModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
