import { Component, OnInit, OnDestroy, HostListener } from "@angular/core";
import { SignalRService } from "../Services/SignalRService";
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IAppState } from 'src/app/app.module';
import { appStateSelector } from '../reducers/app.reducer';
import { tap } from 'rxjs/operators';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  constructor(protected signalRService: SignalRService, protected store$: Store<IAppState>) {}

  isServerOnline;

  onServerOnlineUpdated$: Observable<IAppState> = this.store$.pipe(
    select(appStateSelector),
    tap((_store: IAppState) => {
      this.isServerOnline = (Boolean(_store)  && Boolean(_store.isServerOnline)) ? true: false;
    })
  );

  ngOnInit(): void {
    this.onServerOnlineUpdated$.subscribe();
  }

  title = "signalr-client";
}
