import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { config } from '../config';
import { Router } from '@angular/router';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
reg_exp:any;
is_mobile_app:any = config.IS_MOBILE_APP;
fcm_token:any;
email:any;
password:any;
remember_me:any;
errors:any=['',null,undefined];
is_submit:Boolean=false;
  constructor(public userService: UserService, private router: Router, private fb: Facebook, private googlePlus: GooglePlus) { 
  	this.reg_exp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  }

  ngOnInit() {
  }

  ionViewDidEnter(){
  	var login_cookies = JSON.parse(localStorage.getItem('niteowl_cookies'));
  	if(this.errors.indexOf(login_cookies) == -1){
  		this.email = login_cookies.email;
  		this.password = login_cookies.password;
  	}
    if(this.is_mobile_app == 'true'){
      // this.fcm.getToken().then(token => {
      //   this.fcm_token = token;
      // });
    }
  }

  login(){
    this.is_submit = true;
    if(this.errors.indexOf(this.email) >= 0 || this.errors.indexOf(this.password) >= 0 || !this.reg_exp.test(String(this.email).toLowerCase())){
      return false;
    }

    this.userService.presentLoading();
    this.userService.postData({email: this.email, password: this.password, fcm_token: this.fcm_token},'loginUser').subscribe((result) => {
      this.userService.stopLoading();
      if(result.status == 1){
        if(result.data.status == 1){
          this.is_submit = false;
          if(this.remember_me == true){
          	localStorage.setItem('niteowl_cookies',JSON.stringify({email : this.email, password : this.password}));
          }
          else{
          	localStorage.removeItem('niteowl_cookies');
          }
          this.email = '';
          this.password = '';
          this.userService.presentToast('Logged in successfully!','success');
          this.setSessions(result);
          this.router.navigate(['/home-list']);
        }
        else if(result.data.status == 0){
          this.userService.presentToast('Please verify your email address','danger');
        }
        else{
          this.userService.presentToast('Your account is de-activated! Please contact site admin','danger');
        }
      }
      else{
        this.userService.presentToast('Invalid credentials!','danger');
      }
    },
    err => {
      this.userService.stopLoading();
      this.userService.presentToast('Unable to fetch results, Please try again','danger');
    });
  }

  setSessions(result){
    var userId = this.userService.encryptData(result.data._id,config.ENC_SALT);
    localStorage.setItem('niteowl_auth_token',userId);
    localStorage.setItem('niteowl_sessions',JSON.stringify(result.data));
    // this.events.publish('user_logged_in:true',result.data);
  }

  facebookLogin(){
    this.fb.login(['public_profile', 'email']).then((res: FacebookLoginResponse) => 
       this.fb.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)', []).then(profile => {
        if(this.errors.indexOf(profile) == -1){
          let dict ={
            name: profile['name'],
            email: profile['email'],
            password: '',
            provider: 'facebook',
            providerId: profile['id'],
            baseUrl: config.BASE_URL,
            apiUrl: config.API_URL,
            image: profile['picture_large']['data']['url'],
            fcm_token: this.fcm_token
          };
          this.socialLogin(dict);  
        }
        else{
          this.userService.presentToast('Error while logging in with facebook, please try later.','danger');
        }
      })
      ).catch(e => 
        this.userService.presentToast('Error while logging in with facebook, please try later.','danger')
      );
  }

  googleLogin(){
    this.googlePlus.login({}).then(result => {
      if(this.errors.indexOf(result) == -1){
          let dict ={
            name: result.displayName,
            email: result.email,
            password: '',
            provider: 'google',
            providerId: result.userId,
            baseUrl: config.BASE_URL,
            apiUrl: config.API_URL,
            image: result.imageUrl,
            fcm_token: this.fcm_token
          };

          this.socialLogin(dict);    
        }
        else{
          this.userService.presentToast('Error while logging in with google, please try later.','danger');
        }
      })
    .catch(err => 
      this.userService.presentToast('Error while logging in with google, please try later.','danger')
    );
  }

  socialLogin(dict){
    this.userService.presentLoading();
    this.userService.postData(dict,'social_login').subscribe((result) => {
      this.userService.stopLoading();
      if(result.status == 1){
        this.userService.presentToast('Login successfully!','success');
        this.setSessions(result);
        this.router.navigate(['/home-list']);
      }
      else{
        this.userService.presentToast('Error while logging in! Please try later','danger');
      }
    },
    err => {
      this.userService.stopLoading();
      this.userService.presentToast('Unable to fetch results, Please try again','danger');
    });
  }

}
