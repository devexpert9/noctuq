import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular'; 
import { UserService } from '../services/user/user.service';
import { ActivatedRoute } from '@angular/router';
import { config } from '../config';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media/ngx';
import { Lightbox } from 'ngx-lightbox';


@Component({
  selector: 'app-feed-gallery',
  templateUrl: './feed-gallery.page.html',
  styleUrls: ['./feed-gallery.page.scss'],
})
export class FeedGalleryPage implements OnInit {
userId:any;
event_id:any;
masonryItems:any; 
played_ones:any=[];
errors:any=['',null,undefined];
IMAGES_URL:any=config.IMAGES_URL;
is_mobile_app:any=config.IS_MOBILE_APP;
  constructor(public userService: UserService,private activatedRoute: ActivatedRoute, private photoViewer: PhotoViewer, private streamingMedia: StreamingMedia, private _lightbox: Lightbox,public alertController:AlertController) {
    this.event_id = activatedRoute.snapshot.paramMap.get('id'); 
    
  }

  ngOnInit() {
  }

  ionViewDidEnter(){
    var token = localStorage.getItem('niteowl_auth_token');
    this.userId = this.userService.decryptData(token,config.ENC_SALT);
    this.getFeedUsers();

  }

  getFeedUsers(){
    this.userService.presentLoading();
    this.userService.postData({eventId : this.event_id, userId : this.userId},'all_feeds').subscribe((result) => {
      this.userService.stopLoading();
      this.masonryItems = result;
    },
    err => {
      this.userService.stopLoading();
      this.userService.presentToast('Unable to fetch feeds, Please try again','danger');
    });
  }

  openImage(path){
    if(this.is_mobile_app == 'true'){
      this.photoViewer.show(path);
    }
    else{
      this._lightbox.open([{
        src: path,
        caption: '',
        thumb: path
      }], 0);
    }
  }

  playVideo(path,i){ 
    console.log(path,i)
    if(this.is_mobile_app == 'true'){
      let options: StreamingVideoOptions = {
        successCallback: () => { console.log('Video played') },
        errorCallback: (e) => { console.log('Error streaming') },
        orientation: 'potrait',
        shouldAutoClose: true,
        controls: false
      };

      this.streamingMedia.playVideo(path, options);
    }
    else{
      this.played_ones.push(i);
    }
  }

  async delete(feedId,index) {
    const alert = await this.alertController.create({
      header: 'Are you sure you want to delete this feed?',
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
            this.userService.postData({id:feedId},'delete_user_feed').subscribe((result) => {
              this.userService.stopLoading();
              if(result.status == 1){
                this.userService.presentToast('Feed deleted successfully.','success');
                this.masonryItems.splice(index,1);
              }
              else if(result.status == 2){
                this.userService.presentToast("You can't delete this feed.You can only delete feed before 24 hrs.",'danger');
              }
              else{
                this.userService.presentToast('Error while deleting feed! Please try later','danger');
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

  async flag(feedId,index) {
    const alert = await this.alertController.create({
      header: 'Are you sure you want to report this feed?',
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
            this.userService.postData({id:feedId, userId : this.userId},'flag_feed').subscribe((result) => {
              this.userService.stopLoading();
              if(result.status == 1){
                this.userService.presentToast('Feed has been reported. We will look into it.','success');
                if(result.flag_status == 0){
                  this.masonryItems.splice(index,1);
                }
              }
              else{
                this.userService.presentToast('Error while reporting feed! Please try later','danger');
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

}
  