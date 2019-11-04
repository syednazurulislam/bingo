import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Socket } from 'ng-socket-io';
@Injectable({
  providedIn: 'root'
})
export class PlayertwoService {
public roomid:any;
public storage:any;
public p2socketconnection:boolean;
socketService:any;
socketObserver:any;
p2gameboard:boolean=false;
public BoardId:any;
constructor(private sockets:Socket) { 
  this.socketService= Observable.create(observer=>{
this.socketObserver=observer;
this.sockets.on("GameData",(data)=>{
  
 this.socketObserver.next(data);
 
});
  })
  
}
}




