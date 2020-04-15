import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { config } from '../config';
import { UserService } from '../services/user/user.service';
import { Events } from '@ionic/angular';

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
  constructor(private router: Router, public userService: UserService, private events: Events) { 
  	this.user_sessions = JSON.parse(localStorage.getItem('niteowl_sessions'));
  	this.checkUserAuth();
  	events.subscribe('user_log_activity:true', data => {
	   this.checkUserAuth();
	});
  }

  ngOnInit() {
  }

  logout(type){
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

  ionViewWillUnload(){
    this.events.unsubscribe('user_log_activity:true');
  }

}
