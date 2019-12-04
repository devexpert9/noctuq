import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { config } from '../config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
userId:any;
errors:any=['',null,undefined];
profile:any;
IMAGES_URL:any=config.IMAGES_URL;
is_loaded:Boolean=false;
  constructor(public userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.is_loaded = false;
  	var token = localStorage.getItem('niteowl_auth_token');
    this.userId = this.userService.decryptData(token,config.ENC_SALT);
    this.getProfile();
  }

  getProfile(){
    this.userService.presentLoading();
    this.userService.postData({_id : this.userId},'get_profile').subscribe((result) => {
      this.userService.stopLoading();
      if(this.errors.indexOf(result) == -1){
        this.is_loaded = true;
        this.profile = result;
      }
      else{
        this.userService.presentToast('Session expired, Please login again','danger');
        this.router.navigate(['/login']);
      }
    },
    err => {
      this.is_loaded = true;
      this.userService.stopLoading();
      this.userService.presentToast('Unable to fetch results, Please try again','danger');
    });
  }

  logout(){
    localStorage.removeItem('niteowl_auth_token');
    localStorage.removeItem('niteowl_sessions');
    this.router.navigate(['/login']);
  }

}
