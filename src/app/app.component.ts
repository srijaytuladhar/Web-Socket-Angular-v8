import { Component } from '@angular/core';
import { WebSocketMessage } from './dto/web-socket-message';
import { WebSocketAPI } from './web-socket-api/web-socket-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'springboot-websocket';

  webSocketAPI!: WebSocketAPI;
  greeting: WebSocketMessage = new WebSocketMessage();
  username!: string;
  message!: string;
  webSocketResponse: WebSocketMessage = new WebSocketMessage();
  connection = false;
  ngOnInit() {
    this.webSocketAPI = new WebSocketAPI(new AppComponent());
  }

  connect(){
    this.webSocketAPI._connect();
    this.connection = true;
  }

  disconnect(){
    this.webSocketAPI._disconnect();
    this.connection = false;
  }

  sendMessage(){
    this.webSocketResponse.username = this.username;
    this.webSocketResponse.message = this.message;
    this.webSocketAPI._send(this.webSocketResponse);
    this.greeting = this.webSocketResponse;
  }

  handleMessage(message: any){
    console.log('------>');
    const obj = JSON.parse(message);
    this.greeting = obj;
    console.log(obj);
    console.log(this.greeting);

  }
}
