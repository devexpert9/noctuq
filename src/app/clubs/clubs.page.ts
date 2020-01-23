import { Component, OnInit } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user/user.service';
import { config } from '../config';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx';
import { ModalController } from '@ionic/angular'; 
import { RatingPage } from '../rating/rating.page';

@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.page.html',
  styleUrls: ['./clubs.page.scss'],
})
export class ClubsPage implements OnInit {
event_id:any;
is_loaded:boolean = false;
userId:any;
event:any;
is_rated:any;
avg_rating:any;
errors:any=['',null,undefined];
IMAGES_URL:any=config.IMAGES_URL;
options: LaunchNavigatorOptions = {};
is_favorite:any;
  constructor(private socialSharing: SocialSharing, private activatedRoute: ActivatedRoute,public userService:UserService, private launchNavigator: LaunchNavigator,public modalController: ModalController) { 
    this.event_id = activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.is_loaded = false;
    this.getEventDetails();
  }

  getEventDetails(){
    var token = localStorage.getItem('niteowl_auth_token');
    this.userId = this.userService.decryptData(token,config.ENC_SALT);
    this.userService.presentLoading();
    this.userService.postData({event_id: this.event_id, userId: this.userId},'get_event_details').subscribe((result) => {
      this.userService.stopLoading();
      this.is_loaded = true;
      this.event = result.event;
      this.is_favorite = result.is_favorite;
      this.is_rated = result.is_rated;
      this.avg_rating = result.rating;
      console.log(result)
    },
    err => {
      this.is_loaded = true;
      this.userService.stopLoading();
      this.userService.presentToast('Unable to fetch results, Please try again','danger');
    });
  }

  favorite(){
    var is_favorite = (this.is_favorite == '0') ? '1' : '0';
    this.userService.presentLoading();
    this.userService.postData({event_id: this.event_id, userId: this.userId, is_favourite: is_favorite},'add_favorite').subscribe((result) => {
      this.userService.stopLoading();
      if(result.status == 1){
        this.is_favorite = is_favorite;
        var success_msg = (is_favorite == '1') ? 'Added to favorites.' : 'Removed from favorites.';
        this.userService.presentToast(success_msg,'success');
      }
      else{
        this.userService.presentToast('Error while performing action, Please try again','danger');
      }
    },
    err => {
      this.userService.stopLoading();
      this.userService.presentToast('Unable to fetch results, Please try again','danger');
    });
  }

  openMap(){
    this.launchNavigator.navigate('Toronto, ON', this.options).then(
    success => console.log('Launched navigator'),
    error => console.log('Error launching navigator', error)
    );
  }
  
  share(){
	  // Share via email
  	this.socialSharing.share('Upscale House - Live Bands, Dancing, Food, Drinks').then(() => {
  	  // Success!
  	}).catch(() => {
  	  // Error!
  	});   
  }

  canRate(){
    if(this.is_rated == 0){
      this.rateIt();
    }
  }

  async rateIt(){
    const modal = await this.modalController.create({
      component: RatingPage
    });
    modal.onDidDismiss().then((detail) => {
      if(this.errors.indexOf(detail.data) == -1) {
        this.add_rating(detail.data);
      }
    });
    modal.present();
  }

  add_rating(rating){
    this.userService.presentLoading();
    this.userService.postData({event_id: this.event_id, userId: this.userId, rating: rating},'add_rating').subscribe((result) => {
      this.userService.stopLoading();
      if(result.status == 1){
        this.is_rated = 1;
        this.userService.presentToast('Rated successfully.','success');
      }
      else{
        this.userService.presentToast('Error while rating, Please try again','danger');
      }
    },
    err => {
      this.userService.stopLoading();
      this.userService.presentToast('Error while rating, Please try again','danger');
    });
  }

}
