import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActionSheetController, Platform } from '@ionic/angular'; 
import { UserService } from '../services/user/user.service';
import { config } from '../config';
import { Router, ActivatedRoute } from '@angular/router';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { File, FileEntry } from '@ionic-native/file/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { DomSanitizer } from '@angular/platform-browser';
import * as moment from 'moment-timezone';
declare var window: any; 


@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.page.html',
  styleUrls: ['./add-event.page.scss'],
})
export class AddEventPage implements OnInit {
public win: any = window;
errors:any=['',null,undefined];
all_genres:any;
all_venues:any;
is_submit:Boolean=false;
title:any;
venue_type:any;
genre_type:any;
price:any;
description:any;
userSettings = {};
hostId:any;
imgBlob:any;
file_name:any;
is_image_selected:Boolean=false;
isInvalid:Boolean=false;
is_mobile_app:any = config.IS_MOBILE_APP;
allowedMimes:any=config.IMAGE_EXTENSIONS;
image_url:any;
event_id:any;
isEdit:any;
single_event:any;
prev_image_url:any;
IMAGES_URL:any=config.IMAGES_URL;
date:any;
start_time:any;
end_time:any;
current_date:any;
end_date:any;
  constructor(public userService: UserService, private router: Router,private camera: Camera, private file: File, private filePath: FilePath, public sanitizer:DomSanitizer, public actionSheetController: ActionSheetController, private platform: Platform,private ref: ChangeDetectorRef, private activatedRoute: ActivatedRoute) { 
    var current = new Date();
    this.current_date = current.getFullYear()+'-'+(((current.getMonth()+1) < 10 ? '0'+(current.getMonth()+1) : (current.getMonth()+1)))+'-'+(current.getDate() < 10 ? '0'+current.getDate() : current.getDate());
    var token = localStorage.getItem('niteowl_host_auth_token');
    this.hostId = this.userService.decryptData(token,config.ENC_SALT);
  	this.get_venues_genres();
  	// this.userSettings['inputPlaceholderText'] = 'Location';
   //  this.userSettings = Object.assign({},this.userSettings);
    this.event_id = activatedRoute.snapshot.paramMap.get('id');
    console.log(moment.tz.guess());
  }

  ngOnInit() {
  }

  ionViewDidEnter(){
  	var token = localStorage.getItem('niteowl_host_auth_token');
    this.hostId = this.userService.decryptData(token,config.ENC_SALT);
    if(this.errors.indexOf(this.event_id) == -1){
    	this.isEdit = '1';
    	this.get_single_event();
    }
    else{
    	this.isEdit = '0';
    }
  }

  get_single_event(){
    this.userService.postData({id : this.event_id},'get_single_event').subscribe((result) => {
      if(this.errors.indexOf(result) == -1){
      	this.single_event = result;
      	this.title = this.single_event.title;
      	this.venue_type = this.single_event.venue_type;
      	this.genre_type = this.single_event.genre;
      	this.price = this.single_event.price;
      	this.description = this.single_event.venue_description;
        this.prev_image_url = this.single_event.image;
        this.date = this.single_event.date;
        this.end_date = this.single_event.end_date;
        this.start_time = this.single_event.time;
      	this.end_time = this.single_event.end_time;
      	// this.lat = this.single_event.location.lat;
      	// this.lng = this.single_event.location.lng;
      	// this.location = this.single_event.address;

      	// this.userSettings['inputString'] = this.single_event.address;
    	// this.userSettings = Object.assign({},this.userSettings);
      }
      else{
      	this.userService.presentToast('Invalid Page.','danger');
        this.router.navigate(['/host-events']);
      }
    },
    err => {
      this.single_event = null;
    });
  }

  get_venues_genres(){
    this.userService.postData({uId: this.hostId},'get_venues_forHost').subscribe((result) => {
      this.all_genres = result.genres;
      this.all_venues = result.venues_list;
    },
    err => {
      this.all_genres = [];
      this.all_venues = [];
    });
  }

  // autoCompleteCallback(data) {
  //   console.log(data.data.formatted_address)
  //   this.lat = data.data.geometry.location.lat;
  //   this.lng = data.data.geometry.location.lng;
  //   this.location = data.data.formatted_address;
  // }

  add_event(){ 
    this.is_submit = true;
    if(this.errors.indexOf(this.title) >= 0 || this.errors.indexOf(this.venue_type) >= 0 || this.errors.indexOf(this.genre_type) >= 0 || this.errors.indexOf(this.price) >= 0 || this.errors.indexOf(this.description) >= 0 || this.errors.indexOf(this.date) >= 0 || this.errors.indexOf(this.start_time) >= 0 || this.errors.indexOf(this.end_time) >= 0 ){
      return false;
    }

    const formData = new FormData();
    if(this.is_image_selected){
      if(this.is_mobile_app == 'true'){
        formData.append('file', this.imgBlob, this.file_name); 
      }
      else{
        formData.append('file', this.imgBlob); 
      }
    }

    if(this.isEdit == '1'){
    	formData.append('id', this.event_id);
    }

    formData.append('hostId', this.hostId);
    formData.append('title', this.title);
    formData.append('venue_type', this.venue_type);
    formData.append('price', this.price);
    formData.append('date', this.date.split('T')[0]);
    formData.append('end_date', this.end_date.split('T')[0]);

    if(this.isEdit == '1'){
      formData.append('start_time', this.start_time);
      formData.append('end_time', this.end_time);
    }
    else{
      formData.append('start_time', this.start_time.split('T')[1].substr(0,5));
      formData.append('end_time', this.end_time.split('T')[1].substr(0,5));
    }

    // formData.append('address', this.location);
    // formData.append('lat', this.lat);
    // formData.append('lng', this.lng);
    formData.append('venue_description', this.description);
    formData.append('genre', JSON.stringify(this.genre_type));
    
    this.userService.presentLoading();

    console.log(moment.tz.guess());
  
    var API_ENDPOINT = this.isEdit == '1' ? 'edit_event/'+this.hostId+'/'+this.start_time+'/'+this.date.split('T')[0]+'/'+this.end_time+'/'+this.end_date.split('T')[0]+'/'+this.venue_type+'/'+this.event_id+'/'+moment.tz.guess() : 'add_event/'+this.hostId+'/'+this.start_time.split('T')[1].substr(0,5)+'/'+this.date.split('T')[0]+'/'+this.end_time.split('T')[1].substr(0,5)+'/'+this.end_date.split('T')[0]+'/'+this.venue_type+'/'+moment.tz.guess();


    this.userService.postData(formData, API_ENDPOINT).subscribe((result) => {
      this.userService.stopLoading();
      if(result.status == 1){
        this.is_submit = false;

	    this.title = '';
	    this.venue_type = '';
	    this.price = '';
	    this.description = '';
      this.genre_type = '';
      this.date = '';
      this.start_time = '';
	    this.end_time = '';
	    this.is_image_selected = false;
	    this.imgBlob = '';
	    this.file_name = '';
	    // this.userSettings['inputString'] = '';
    	// this.userSettings = Object.assign({},this.userSettings);
    	var message = '';
    	if(this.isEdit == '1'){
    		message = 'Event updated successfully.';
    	}
    	else{
    		message = 'Event added successfully.';
    	}
        this.userService.presentToast( message,'success');
        this.router.navigate(['/host-events']);
      }
      else if(result.status == 2){
        this.userService.presentToast('Event already exists with same name.','danger');
      }
      else if(result.status == 3){
        this.userService.presentToast('You can add only 100 events.Please remove existing events to add new one.','danger');
      }
      else if(result.status == 5){
        this.userService.presentToast('You can not add event on past date and time','danger');
      }
      else if(result.status == 7){
        this.userService.presentToast('End date should be greater than start date','danger');
      }
      else if(result.status == 6){
        this.userService.presentToast('End time should be greater than start time','danger');
      }
      else if(result.status == 9){
        this.userService.presentToast('Event already exists in selected dates','danger');
      }
      else{
        this.userService.presentToast('Error while adding event! Please try later','danger');
      }
    
    },
    err => {
      this.userService.stopLoading();
      this.userService.presentToast('Unable to send request, Please try again','danger');
    });
  }

  uploadImg(event){ 
    var self = this;
    this.isInvalid = false;
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      var image_file = event.target.files[0];
      if(self.allowedMimes.indexOf(image_file.type) == -1){
        this.isInvalid = true;
        this.userService.presentToast('Please select valid image','danger');
      }
      else{
        self.is_image_selected = true;
        self.imgBlob = image_file;
        self.image_url = window.URL.createObjectURL(image_file);
        self.ref.detectChanges();
      }
    }
  }

  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: "Select Image source",
      buttons: [{
            text: 'Load from Library',
            handler: () => {
                this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
            }
        },
        {
            text: 'Use Camera',
            handler: () => {
                this.takePicture(this.camera.PictureSourceType.CAMERA);
            }
        },
        {
            text: 'Cancel',
            role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }

  takePicture(sourceType: PictureSourceType) {
    var options: CameraOptions = {
        quality: 50,
        sourceType: sourceType,
        saveToPhotoAlbum: false,
        correctOrientation: true
    };

    this.camera.getPicture(options).then(imagePath => {
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
          this.filePath.resolveNativePath(imagePath)
              .then(filePath => {
                this.startUpload(imagePath);
              });
      } else {
        this.startUpload(imagePath);
      }
    });
  } 

  startUpload(imgEntry) {
    this.image_url = imgEntry;
    this.ref.detectChanges();
    this.file.resolveLocalFilesystemUrl(imgEntry)
        .then(entry => {
            ( < FileEntry > entry).file(file => this.readFile(file,imgEntry))
        })
        .catch(err => {
            this.userService.presentToast('Error while reading file.','danger');
        });
  }
   
  readFile(file: any,imgEntry) {
    var self = this;
    const reader = new FileReader();
    reader.onloadend = () => {
        const imgBlob = new Blob([reader.result], {
            type: file.type
        });
        self.is_image_selected = true;
        self.imgBlob = imgBlob;
        self.file_name = file.name;
        self.ref.detectChanges();
    };
    reader.readAsArrayBuffer(file);
  }

}
