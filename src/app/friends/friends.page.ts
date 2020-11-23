import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { config } from '../config';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.page.html',
  styleUrls: ['./friends.page.scss'],
})
export class FriendsPage implements OnInit {
friendstabs:any = 'friends';
userId:any;
search_term:any;
search_users:any;
friends:any;
friend_requests:any;
errors:any=['',null,undefined];
IMAGES_URL:any=config.IMAGES_URL;
  constructor(public userService:UserService) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
  	var token = localStorage.getItem('niteowl_auth_token');
    this.userId = this.userService.decryptData(token,config.ENC_SALT);
    this.my_friends();
  }

  searchUsers(){
  	if(this.errors.indexOf(this.search_term) == -1){
  		var self = this;
  		setTimeout(function(){
  			self.getUsers();
  		},500);
  	}
  }

  getUsers(){
    this.userService.presentLoading();
    this.userService.postData({userId: this.userId, search_term: this.search_term},'search_users').subscribe((result) => {
      this.userService.stopLoading();
      this.search_users = result;
      console.log(result)
    },
    err => {
      this.userService.stopLoading();
      this.userService.presentToast('Unable to fetch results. Please try again','danger');
    });
  }

  my_friends(){
    this.userService.presentLoading();
    this.userService.postData({userId: this.userId, type : 'friends'},'my_friends').subscribe((result) => {
      this.friends = result.data;
      this.my_friend_requests();
    },
    err => {
      this.my_friend_requests();
      this.userService.presentToast('Unable to fetch results. Please try again','danger');
    });
  }

  my_friend_requests(){
    this.userService.postData({userId: this.userId, type : 'requests'},'my_friends').subscribe((result) => {
      this.userService.stopLoading();
      this.friend_requests = result.data;
      console.log(result)
    },
    err => {
      this.userService.stopLoading();
      this.userService.presentToast('Unable to fetch results. Please try again','danger');
    });
  }

}
