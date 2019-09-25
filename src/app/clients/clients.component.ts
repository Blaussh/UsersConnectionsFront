import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '../app.module';
import { selectClientsInfos, appStateSelector } from '../signalr-client/reducers/app.reducer';
import { Observable } from 'rxjs';
import { ClientInfo } from '../signalr-client/Models/client-info';
import { tap } from 'rxjs/operators';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients: ClientInfo[] = []
  breakpoint: number;
  onClientsListUpdated$: Observable<IAppState> = this.store$.pipe(
    select(appStateSelector),
    tap((_store: IAppState) => {
      this.clients = (Boolean(_store)  && Boolean(_store.clientsInfos)) ? _store.clientsInfos: [];
    })
  );


  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 6;
  }

  constructor(protected store$: Store<IAppState>) { }

  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 6;
    this.onClientsListUpdated$.subscribe();
  }

}
