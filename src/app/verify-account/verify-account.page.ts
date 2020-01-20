import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user/user.service';
import { config } from '../config';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.page.html',
  styleUrls: ['./verify-account.page.scss'],
})

export class VerifyAccountPage implements OnInit {
userId:any;
message:any='Processing...';
  constructor(public userService: UserService,private activatedRoute: ActivatedRoute) { 
  	this.userId = activatedRoute.snapshot.paramMap.get('id'); 
  	this.verify();
  }

  ngOnInit() {
  }

  verify(){
  	this.userService.presentLoading();
    this.userService.postData({userId: this.userId},'verify_account').subscribe((result) => { 
      this.userService.stopLoading();
      if(result.status == 1){
      	this.message = 'Your account is verified successfully.';
      }
      else if(result.status == 2){	
      	this.message = 'Invalid link.';
      }
      else{
      	this.message = 'Error while verifying your account. Please try later.';
      }
    },
    err => {
      this.message = 'Error while verifying your account. Please try later.';
      this.userService.stopLoading();
    });
  }

}
