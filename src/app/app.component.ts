import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { ChatService } from './chat.service';
import * as io from 'socket.io-client';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  chats: any;
  joinned: boolean = false;
  yolo:string[] = [];
  newUser = { nickname: '', room: '' };
  msgData = { room: '', nickname: '', message: '' };
  socket = io('http://localhost:3001');
  msg = "";
  username = "Yellow penguin";
  ngOnInit(){
    this.chats = [];

    this.socket.on('new-message', function (data) {
        this.chats.push(data);
    }.bind(this));
  }
  SendMessage(){
    var res = {
      name: this.username,
      msg: this.msg
    }
    this.socket.emit('save-message',res)
    this.msg = ""
  }

}
