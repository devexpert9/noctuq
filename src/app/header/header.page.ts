import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { config } from '../config';
import { UserService } from '../services/user/user.service';
import { Events, AlertController } from '@ionic/angular';
import { EventService } from '../services/event/event.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.page.html',
  styleUrls: ['./header.page.scss'],
})
export class HeaderPage implements OnInit {
isLoggedIn:boolean;
isHostLoggedIn:boolean;
errors:any = ['',null,undefined];
user_sessions:any;
host_sessions:any;
IMAGES_URL:any=config.IMAGES_URL;
messages:any;
notifications:any;
res_came:boolean=false;

  constructor(public events1: EventService, private router: Router, public userService: UserService, public events: Events,public alertController: AlertController) { 
  	this.user_sessions = JSON.parse(localStorage.getItem('niteowl_sessions'));
  	this.checkUserAuth();
  	events.subscribe('user_log_activity:true', data => {
      var token = localStorage.getItem('niteowl_auth_token');
      var userId = this.userService.decryptData(token,config.ENC_SALT);
     this.checkUserAuth();
     this.get_Messages();
     this.get_Notifications();
  });
  
  this.events1.getObservable().subscribe((data) => {
    this.get_Messages();
    this.get_Notifications();

  })

  this.get_Messages();
  this.get_Notifications();
  
  }

 


  ngOnInit() {
    this.events.subscribe('read_msgs', data => {
      this.get_Messages();
      console.log('yeaaahhhhh')
    });
  }

  logout(type){
    localStorage.removeItem('userType');
    if(type == 'user'){
      localStorage.removeItem('niteowl_auth_token');
      localStorage.removeItem('niteowl_sessions');
      this.isLoggedIn = false;
      this.router.navigate(['/login']);
    }
    else{
      localStorage.removeItem('niteowl_host_auth_token');
      localStorage.removeItem('niteowl_host_sessions');
      this.isHostLoggedIn = false;
      this.router.navigate(['/login/host']);
    }
  }

  checkUserAuth(){
    var token = localStorage.getItem('niteowl_auth_token');
    var userId = this.userService.decryptData(token,config.ENC_SALT);

    var token = localStorage.getItem('niteowl_host_auth_token');
    var hostId = this.userService.decryptData(token,config.ENC_SALT);
    if(this.errors.indexOf(userId) == -1 && userId != 0){
      this.user_sessions = JSON.parse(localStorage.getItem('niteowl_sessions'));
      this.isLoggedIn = true;
      if(this.user_sessions.is_first_time == 0){
        this.user_sessions.is_first_time = 1;
        localStorage.setItem('niteowl_sessions',JSON.stringify(this.user_sessions));
        this.allowLocation(userId);
      }
    }
    else{
      this.isLoggedIn = false;
    }

    if(this.errors.indexOf(hostId) == -1 && hostId != 0){
      this.host_sessions = JSON.parse(localStorage.getItem('niteowl_host_sessions'));
      this.isHostLoggedIn = true;
    }
    else{
      this.isHostLoggedIn = false;
    }
  }

  async allowLocation(userId){
    const alert = await this.alertController.create({
      header: 'Allow location access to get nearby events and venues?',
      message: '',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.userService.postData({userId:userId, is_first_time:1, allow_city_region : 0},'allow_location').subscribe((result) => {
                console.log(result)
            });
          }
        }, {
          text: 'Yes',
          handler: () => {
            this.userService.postData({userId:userId, is_first_time:1, allow_city_region : 1},'allow_location').subscribe((result) => {
                console.log(result)
            });
          }
        }
      ]
    });

    await alert.present();
  }

  ionViewWillUnload(){
    this.events.unsubscribe('user_log_activity:true');
  }

  get_Messages() {
    //get messages//
    var token = localStorage.getItem('niteowl_auth_token');
    var userId = this.userService.decryptData(token,config.ENC_SALT);
   
      this.userService.postData({userId:userId},'get_unread_messages').subscribe((result) => {
        // this.messages = 50;
        var res;
        res= result;
        if(res.status == 1){
        this.messages = res.data ;
        this.res_came=true;
        console.log('werty');
        console.log(this.messages);
        
        }else{
        this.messages= null;
        this.res_came=true;


        }
       
      },
      err => {
 
      });
}


get_Notifications() {
 //get messages//
 var token = localStorage.getItem('niteowl_auth_token');
 var userId = this.userService.decryptData(token,config.ENC_SALT);

   this.userService.postData({userId:userId},'get_unread_notifications').subscribe((result) => {
     var res;
     res= result;
     if(result.status == 1){
     this.notifications= result.data ;
     this.res_came=true;
     console.log('werty');
     console.log(this.messages);
     
     }else{
       this.notifications= null ;
       this.res_came=true;

     }
    
   },
   err => {

   });
}

}
