import { Component, OnInit, ElementRef, ViewChild, ViewContainerRef } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable,FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild("endTime", {read: ElementRef}) vc: ElementRef;
  ngAfterViewInit(): void {
    
         console.log(this.vc.nativeElement.textContent);
     }
  timer : FirebaseObjectObservable<any>;
  hours="";
  minutes=";"
  seconds="";
 latehours="";
 lateminutes="";
 lateseconds="";
 audio: any;
 
  constructor(db: AngularFireDatabase ){
  
    this.runAudio("../assets/Short321.wav");
    this.timer=db.object('date',{ preserveSnapshot: true });
    this.setTimer();
    this.timer=db.object('lateDate',{ preserveSnapshot: true });
    this.setLateTimer();  
  }



  public setTimer(){
    this.timer.subscribe(snapshot => {
      this.hours=snapshot.val().hour;
      this.minutes=snapshot.val().minute;
      this.seconds=snapshot.val().second;
      this.checkAudio(this.hours,this.minutes,this.seconds);
    });
  }

  public setLateTimer(){
    this.timer.subscribe(snapshot => {
      this.latehours=snapshot.val().hour;
      this.lateminutes=snapshot.val().minute;
      this.lateseconds=snapshot.val().second;
    });
  }


  public checkAudio(hours, minutes, seconds){
    if(hours=="00:"&&minutes=="00:"){
      if(seconds=="29"||(parseInt(seconds)<10)&&parseInt(seconds)>=0){
          this.runAudio("../assets/bass_drum_hit1s.wav");
      }
      
  }
  else if (hours==""&&minutes==""&&seconds==""){
  
      this.runAudio("../assets/end_horn.wav");
  
}
  }
  


  public runAudio(source){
    this.audio= new Audio();
    this.audio.src = source;
    this.audio.load();
    this.audio.play();
  }


 
}
 
  
  

  
  


