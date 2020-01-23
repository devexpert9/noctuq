import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { config } from '../config';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
userId:any;
can_push_notifications:Boolean;
can_send_emails:Boolean;
can_hot_menu_at_top:Boolean;
allow_city_region:Boolean;
is_loaded:Boolean = false;
can_update:Boolean = false;

  constructor(public userService: UserService) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
  	this.is_loaded = false;
  	this.can_update = false;
  	var token = localStorage.getItem('niteowl_auth_token');
    this.userId = this.userService.decryptData(token,config.ENC_SALT);
  	this.getUserSettings();
  }

  getUserSettings(){
  	this.userService.presentLoading();
    this.userService.postData({userId: this.userId},'get_user_settings').subscribe((result) => { 
      this.is_loaded = true;
      if(result.status == 1){
      	this.can_push_notifications = result.data.can_push_notifications == 1 ? true : false;
      	this.can_send_emails = result.data.can_send_emails == 1 ? true : false;
      	this.can_hot_menu_at_top = result.data.can_hot_menu_at_top == 1 ? true : false;
      	this.allow_city_region = result.data.allow_city_region == 1 ? true : false;
      	var self = this;
      	setTimeout(function(){
      		self.can_update = true;
      	},1000);
      }
      else{
      	this.userService.presentToast('Error while fetching your settings,Please try after some time','danger');
      }
      this.userService.stopLoading();
      console.log(result)
    },
    err => {
      this.is_loaded = true;
      this.userService.stopLoading();
      this.userService.presentToast('Unable to fetch results, Please try again','danger');
    });
  }

  update(){
  	if(this.can_update == true){
	  	this.userService.postData({
		  		userId: this.userId, 
		  		can_push_notifications: (this.can_push_notifications == true) ? 1 : 0, 
				can_send_emails: (this.can_send_emails == true) ? 1 : 0, 
				can_hot_menu_at_top: (this.can_hot_menu_at_top == true) ? 1 : 0,
				allow_city_region: (this.allow_city_region == true) ? 1 : 0
	  		},'update_user_settings').subscribe((result) => { 
	  	  if(result.status == 1){
          var user_sessions = JSON.parse(localStorage.getItem('niteowl_sessions'));
          user_sessions.can_push_notifications = (this.can_push_notifications == true) ? 1 : 0;
          user_sessions.can_send_emails = (this.can_send_emails == true) ? 1 : 0;
          user_sessions.can_hot_menu_at_top = (this.can_hot_menu_at_top == true) ? 1 : 0;
          user_sessions.allow_city_region = (this.allow_city_region == true) ? 1 : 0;
          localStorage.setItem('niteowl_sessions',JSON.stringify(user_sessions));
  	  	  	this.userService.presentToast('Settings updated','success')
  	  	  }
	  	  else{
	  	  	this.userService.presentToast('Error while updating settings,Please try after some time','danger')
	  	  }
	      console.log(result)
	    },
	    err => {
	      this.userService.presentToast('Unable to fetch results, Please try again','danger');
	    });
  	}
  }

}
