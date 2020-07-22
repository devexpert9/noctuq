import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { Router } from '@angular/router';
import { config } from '../config';
import { FCM } from '@ionic-native/fcm/ngx';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
reg_exp:any;
is_mobile_app:any = config.IS_MOBILE_APP;
fcm_token:any;
name:any;
email:any;
password:any;
confirm_password:any;
dob:any;
errors:any=['',null,undefined];
is_submit:Boolean=false;
max_year_dob:any;
  constructor(public userService: UserService, private router : Router, private fcm: FCM) { 
  	this.reg_exp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.max_year_dob = new Date().getFullYear() - 18;
  }

  ngOnInit() {
  }

  ionViewDidEnter(){
    if(this.is_mobile_app == 'true'){
      this.fcm.getToken().then(token => {
        this.fcm_token = token;
      });
    }
  }

  register(){
    this.is_submit = true;
    if(this.errors.indexOf(this.name) >= 0 || this.errors.indexOf(this.email) >= 0 || !this.reg_exp.test(String(this.email).toLowerCase()) || this.errors.indexOf(this.password) >= 0 || this.password.length < 6 || this.errors.indexOf(this.confirm_password) >= 0 || this.errors.indexOf(this.dob) >= 0 || this.password != this.confirm_password){
      return false;
    }

    let dict ={
      name: this.name,
      email: this.email,
      password: this.password,
      dob: this.dob.split('T')[0],
      provider:'direct',
      providerId: '',
      baseUrl: config.BASE_URL,
      apiUrl: config.API_URL,
      fcm_token: this.fcm_token
    };
    
    this.userService.presentLoading();
    this.userService.postData(dict,'registerUser').subscribe((result) => {
      this.userService.stopLoading();
      if(result.status == 1){
        this.is_submit = false;
        this.userService.presentToast('Registered successfully! An email sent on your registered email address, please verify your account.','success');
        this.router.navigate(['/login']);
      }
      else if(result.status == 2){
        this.userService.presentToast('Account already exists with this email','danger');
      }
      else if(result.status == 3){
        this.userService.presentToast('You can no longer use that email. Contact Noctuq Support for more information.','danger');
      }
      else{
        this.userService.presentToast('Error while signing up! Please try later','danger');
      }
    },
    err => {
      this.userService.stopLoading();
      this.userService.presentToast('Unable to send request, Please try again','danger');
    });
  }

}
