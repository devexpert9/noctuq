import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { config } from '../config';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.page.html',
  styleUrls: ['./public-profile.page.scss'],
})
export class PublicProfilePage implements OnInit {
userId:any;
toId:any;
errors:any=['',null,undefined];
profile:any;
IMAGES_URL:any=config.IMAGES_URL;
is_loaded:Boolean=false;
mySession:any;
  constructor(public userService: UserService, private activatedRoute: ActivatedRoute, private router: Router) { 
  	this.is_loaded = false;
  	this.toId = activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
  }

  ionViewDidEnter(){
  	var token = localStorage.getItem('niteowl_auth_token');
    this.userId = this.userService.decryptData(token,config.ENC_SALT);
    this.mySession = JSON.parse(localStorage.getItem('niteowl_sessions'));
    this.getProfile();
  }

  getProfile(){
    this.userService.presentLoading();
    this.userService.postData({_id : this.toId, userId : this.userId},'get_profile').subscribe((result) => {
      this.userService.stopLoading();
      if(this.errors.indexOf(result) == -1){
        this.is_loaded = true;
        this.profile = result;
      }
      else{
        this.userService.presentToast('Invalid Link, Please try again','danger');
      }
    },
    err => {
      this.is_loaded = true;
      this.userService.stopLoading();
      this.userService.presentToast('Unable to fetch results, Please try again','danger');
    });
  }

  addFriend(){
  	this.userService.presentLoading();
    this.userService.postData({toId : this.toId, userId : this.userId, from_name : this.mySession.name},'add_friend').subscribe((result) => {
      this.userService.stopLoading();
      if(result.status == 1){
        this.profile.sent_request = 1;
        this.userService.presentToast('Friend request sent.','success');
      }
      else if(result.status == 2){
        this.userService.presentToast('You have already sent friend request','success');
      }
      else{
        this.userService.presentToast('Error while sending request, Please try again','danger');
      }
    },
    err => {
      this.userService.stopLoading();
      this.userService.presentToast('Unable to fetch results, Please try again','danger');
    });
  }

  change_status(type){
    this.userService.presentLoading();
    this.userService.postData({toId : this.toId, userId : this.userId, status : type, from_name : this.mySession.name},'accept_reject_friend_request').subscribe((result) => {
      this.userService.stopLoading();
      if(result.status == 1){
        this.profile.coming_request = 0;
        if(type == 1){
          this.profile.is_friend = 1;
          this.profile.friends = Number(this.profile.friends) + 1;
        }
        var message = type == 1 ? 'Request accepted.' : 'Request rejected.';
        this.userService.presentToast(message,'success');
      }
      else{
        this.userService.presentToast('Error while performing action, Please try again','danger');
      }
    },
    err => {
      this.userService.stopLoading();
      this.userService.presentToast('Unable to perform operation, Please try again','danger');
    });
  }

  chat(){
    localStorage.setItem('chat_name',this.profile.name);
    localStorage.setItem('chat_image',this.profile.image);
    localStorage.setItem('chat_is_social_image',this.profile.is_social_image);
    this.router.navigate(['/chat/'+this.toId]);
  }

}
