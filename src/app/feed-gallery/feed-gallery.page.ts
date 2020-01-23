import { Component, OnInit } from '@angular/core';
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
  constructor(public userService: UserService,private activatedRoute: ActivatedRoute, private photoViewer: PhotoViewer, private streamingMedia: StreamingMedia, private _lightbox: Lightbox) {
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

}
  