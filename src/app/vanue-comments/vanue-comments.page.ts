import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user/user.service';
import { config } from '../config';

@Component({
  selector: 'app-vanue-comments',
  templateUrl: './vanue-comments.page.html',
  styleUrls: ['./vanue-comments.page.scss'],
})
export class VanueCommentsPage implements OnInit {
event_id:any;
is_loaded:boolean = false;
userId:any;
comments:any=[];
comment:any;
mySession:any;
errors:any=['',null,undefined];
IMAGES_URL:any=config.IMAGES_URL;
  constructor(private activatedRoute: ActivatedRoute,public userService:UserService) { 
  	this.event_id = activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.is_loaded = false;
    this.getComments();
  }

  ionViewDidEnter(){
  	var token = localStorage.getItem('niteowl_auth_token');
    this.userId = this.userService.decryptData(token,config.ENC_SALT);
    this.mySession = JSON.parse(localStorage.getItem('niteowl_sessions'));
  }

  getComments(){
    this.userService.presentLoading();
    this.userService.postData({event_id: this.event_id},'get_comments').subscribe((result) => {
      this.userService.stopLoading();
      this.is_loaded = true;
      this.comments = result;
      console.log(result)
    },
    err => {
      this.is_loaded = true;
      this.userService.stopLoading();
      this.userService.presentToast('Unable to fetch results, Please try again','danger');
    });
  }

  addComments(){
  	if(this.errors.indexOf(this.comment) == -1){
  		this.userService.presentLoading();
	    this.userService.postData({event_id: this.event_id, userId: this.userId, comment: this.comment},'add_comments').subscribe((result) => {
	      this.userService.stopLoading();
	      this.comments.push({
          name : this.mySession.name,
          image : this.mySession.image,
          is_social_image : this.mySession.is_social_image,
          comment : this.comment,
          created_at : new Date(),
          event_id : this.event_id,
          userId : this.userId,
          _id : result._id
        });
        this.comment = '';
	      console.log(result)
	    },
	    err => {
	      this.userService.stopLoading();
	      this.userService.presentToast('Unable to add comments, Please try again','danger');
	    });
  	}
  	else{
  		this.userService.presentToast('Please enter your comments','danger');
  	}
  }

}
