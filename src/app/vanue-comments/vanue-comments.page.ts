import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user/user.service';
import { config } from '../config';
import { AlertController } from '@ionic/angular'; 

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
hostId:any;
errors:any=['',null,undefined];
IMAGES_URL:any=config.IMAGES_URL;
page_type:any;
  constructor(private activatedRoute: ActivatedRoute,public userService:UserService,public alertController:AlertController, public router: Router) { 
  	this.event_id = activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.is_loaded = false;
    this.getComments();
  }

  ionViewDidEnter(){
    this.page_type = localStorage.getItem('eve_venue_page_type');
  	var token = localStorage.getItem('niteowl_auth_token');
    this.userId = this.userService.decryptData(token,config.ENC_SALT);
    if(this.userId != 0){
      this.mySession = JSON.parse(localStorage.getItem('niteowl_sessions'));
    }
    else{
      var host_token = localStorage.getItem('niteowl_host_auth_token');
      this.hostId = this.userService.decryptData(host_token,config.ENC_SALT);
      this.mySession = JSON.parse(localStorage.getItem('niteowl_host_sessions'));
    }
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
      if(this.comment.length > 300){
        this.userService.presentToast('Comment should not exceed 300 characters.','danger');
      }
      else{
    		this.userService.presentLoading();
  	    this.userService.postData({event_id: this.event_id, userId: (this.userId == 0 ? this.hostId : this.userId), user_type : (this.userId == 0 ? 'host' : 'user'), comment: this.comment, page_type : this.page_type},'add_comments').subscribe((result) => {
  	      this.userService.stopLoading();
          if(result.status == 1){
            this.comments.push({
              name : this.mySession.name,
              image : this.mySession.image,
              is_social_image : this.mySession.is_social_image,
              comment : result.data.comment,
              created_at : new Date(),
              event_id : this.event_id,
              userId : this.userId,
              _id : result.data._id
            });
            this.comment = '';
          }
          else if(result.status == 2){
            this.userService.presentToast('You can add only 1 comment in a day.Try after 24 hrs.','danger');
          }
          else{
            this.userService.presentToast('Unable to add comments, Please try again','danger');
          }
  	    },
  	    err => {
  	      this.userService.stopLoading();
  	      this.userService.presentToast('Unable to add comments, Please try again','danger');
  	    });
      }
  	}
  	else{
  		this.userService.presentToast('Please enter your comments','danger');
  	}
  }

  async flag(feedId,index) {
    const alert = await this.alertController.create({
      header: 'Are you sure you want to report this comment?',
      message: '',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            // cancelled
          }
        }, {
          text: 'Yes',
          handler: () => {
            this.userService.presentLoading();
            this.userService.postData({id:feedId, userId : this.userId},'flag_comment').subscribe((result) => {
              this.userService.stopLoading();
              if(result.status == 1){
                this.userService.presentToast('Comment has been reported. We will look into it.','success');
                if(result.flag_status == 0){
                  this.comments.splice(index,1);
                }
              }
              else{
                this.userService.presentToast('Error while reporting comment! Please try later','danger');
              }
            },
            err => {
              this.userService.stopLoading();
              this.userService.presentToast('Unable to send request, Please try again','danger');
            });
          }
        }
      ]
    });

    await alert.present();
  }

  userProfile(user_type, uid){
    if(user_type == 'user'){
      this.router.navigate(['/public-profile/'+uid])
    }
  }

}
