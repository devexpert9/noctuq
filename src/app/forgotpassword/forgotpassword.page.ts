import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { config } from '../config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.page.html',
  styleUrls: ['./forgotpassword.page.scss'],
})
export class ForgotpasswordPage implements OnInit {
email:any;
otp:any;
userId:any;
reg_exp:any;
is_submit:Boolean=false;
errors:any=['',null,undefined];
step:any = '1';
otp_id:any;
password:any;
confirm_password:any;
  constructor(public userService: UserService, public router: Router) { 
  	this.reg_exp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  }

  ngOnInit() {
  }

  resetPassword(){
  	this.is_submit = true;
    if(this.errors.indexOf(this.email) >= 0 || !this.reg_exp.test(String(this.email).toLowerCase())){
      return false;
    }

    this.userService.presentLoading();
    this.userService.postData({email: this.email, type : 'forgot', apiUrl : config.API_URL},'reset_password_request').subscribe((result) => {
      this.userService.stopLoading();
      this.is_submit = false;
      if(result.status == 1){
        this.email = '';
        this.userService.presentToast('OTP sent on your email address!','success');
        this.step = '2';
        this.otp_id = result.data._id;
      }
      else if(result.status == 2){
        this.userService.presentToast("Email doesn't exists in our system!",'danger');
      }
      else{
        this.userService.presentToast('Unable to fetch results, Please try again!','danger');
      }
    },
    err => {
      this.userService.stopLoading();
      this.userService.presentToast('Unable to fetch results, Please try again','danger');
    });
  }

  verifyOTP(){
    this.is_submit = true;
    if(this.errors.indexOf(this.otp) >= 0){
      return false;
    }

    this.userService.presentLoading();
    this.userService.postData({otp_id: this.otp_id, otp : this.otp},'verify_otp').subscribe((result) => {
      this.userService.stopLoading();
      this.is_submit = false;
      if(result.status == 1){
        this.otp = '';
        this.userService.presentToast('OTP verified!','success');
        this.step = '3';
        this.userId = result.data.userId;
      }
      else{
        this.userService.presentToast('Invalid OTP!','danger');
      }
    },
    err => {
      this.userService.stopLoading();
      this.userService.presentToast('Unable to fetch results, Please try again','danger');
    });
  }

  setPassword(){
    this.is_submit = true;
    if(this.errors.indexOf(this.password) >= 0 || this.password.length < 6 || this.errors.indexOf(this.confirm_password) >= 0 || this.password != this.confirm_password){
      return false;
    }

    this.userService.presentLoading();
    this.userService.postData({userId: this.userId, password : this.password},'reset_password').subscribe((result) => {
      this.userService.stopLoading();
      this.is_submit = false;
      if(result.status == 1){
        this.password = '';
        this.confirm_password = '';
        this.userService.presentToast('Password updated successfully!','success');
        this.router.navigate(['/login']);
      }
      else{
        this.userService.presentToast('Error while updating the password! Please try later.','danger');
      }
    },
    err => {
      this.userService.stopLoading();
      this.userService.presentToast('Unable to fetch results, Please try again','danger');
    });
  }

}
