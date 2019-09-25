import { Component, OnInit, Input } from '@angular/core';
import { ClientInfo } from '../signalr-client/Models/client-info';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  @Input() clientInfo: ClientInfo;

  constructor() {
  }

  getColor() {
    return this.clientInfo.isConnected ? '#9bc39b' : '#c3a4a4';
  }

  ngOnInit() {
  }
}
