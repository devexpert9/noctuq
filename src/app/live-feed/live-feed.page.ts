import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { ActivatedRoute } from '@angular/router';
import { config } from '../config';

@Component({
  selector: 'app-live-feed',
  templateUrl: './live-feed.page.html',
  styleUrls: ['./live-feed.page.scss'],
})
export class LiveFeedPage implements OnInit {
userId:any;
loginId:any;
  constructor(public userService: UserService,private activatedRoute: ActivatedRoute) {
    this.userId = activatedRoute.snapshot.paramMap.get('id'); 
    this.getFeeds();
  }

  ngOnInit() {
  }

  ionViewDidEnter(){
  	var token = localStorage.getItem('niteowl_auth_token');
    this.loginId = this.userService.decryptData(token,config.ENC_SALT);
  }

  getFeeds(){
  	this.userService.presentLoading();
    this.userService.postData({userId : this.userId, loginId : this.loginId},'all_feeds').subscribe((result) => {
      this.userService.stopLoading();
      console.log(result);
    },
    err => {
      this.userService.stopLoading();
      this.userService.presentToast('Unable to fetch feeds, Please try again','danger');
    });
  }

}
