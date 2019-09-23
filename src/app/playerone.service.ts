import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Socket } from 'ng-socket-io';
@Injectable({
  providedIn: 'root'
})
export class PlayeroneService {
public storage:any;
public p1socketconnection:boolean=true;
socketService:any;
socketObserver:any;
p1gameboard:boolean=false;

  constructor(private sockets:Socket) { 
    this.socketService= Observable.create(observer=>{
this.socketObserver=observer;
this.sockets.on("GameData",(data)=>{
  
 this.socketObserver.next(data);
});
    })
    
  }

}
