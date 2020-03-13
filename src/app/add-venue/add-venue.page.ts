import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActionSheetController, Platform } from '@ionic/angular'; 
import { UserService } from '../services/user/user.service';
import { config } from '../config';
import { Router, ActivatedRoute } from '@angular/router';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { File, FileEntry } from '@ionic-native/file/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { DomSanitizer } from '@angular/platform-browser';
import { FileUploader } from 'ng2-file-upload';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
declare var window: any;

@Component({
  selector: 'app-add-venue',
  templateUrl: './add-venue.page.html',
  styleUrls: ['./add-venue.page.scss'],
})
export class AddVenuePage implements OnInit {
public win: any = window;
errors:any=['',null,undefined];
all_genres:any;
all_venues:any;
is_submit:Boolean=false;
name:any;
venue_type:any;
genre_type:any;
price:any;
location:any;
description:any;
lat:any;
lng:any;
userSettings = {};
hostId:any;
imgBlob:any;
file_name:any;
isInvalid:Boolean=false;
is_mobile_app:any = config.IS_MOBILE_APP;
allowedMimes:any=config.IMAGE_EXTENSIONS;
image_url:any;
event_id:any;
isEdit:any;
single_event:any;
keywords:any;
prev_image_url:any;
IMAGES_URL:any=config.IMAGES_URL;
all_images:any=[];
product_images:any=[];
public uploader:FileUploader = new FileUploader({url: ''});
public hasBaseDropZoneOver:boolean = false;
deleted_imgs:any=[];
deleted_files:any=[];
  constructor(public userService: UserService, private router: Router,private camera: Camera, private file: File, private filePath: FilePath, public sanitizer:DomSanitizer, public actionSheetController: ActionSheetController, private platform: Platform,private ref: ChangeDetectorRef, private activatedRoute: ActivatedRoute, public imagePicker: ImagePicker) { 
  	this.get_venues_genres();
  	this.userSettings['inputPlaceholderText'] = 'Location';
    this.userSettings = Object.assign({},this.userSettings);
    this.event_id = activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.deleted_imgs = [];
    this.deleted_files = [];
    this.all_images = [];
    this.uploader.queue = [];
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
    this.userService.postData({venue_id : this.event_id},'get_venue_details').subscribe((result) => {
      if(this.errors.indexOf(result) == -1){
      	this.single_event = result.venue;
      	this.name = this.single_event.name;
      	this.venue_type = [];
      	this.genre_type = this.single_event.genre;
      	this.price = this.single_event.price;
      	this.description = this.single_event.venue_description;
      	this.prev_image_url = this.single_event.image;
      	this.lat = this.single_event.cords.coordinates[1];
      	this.lng = this.single_event.cords.coordinates[0];
        this.location = this.single_event.address;
        this.keywords = this.single_event.keywords;
      	this.all_images = result.images;

        if(this.single_event.venue_type.length > 0){
          var self = this;
          this.single_event.venue_type.forEach(function(venue){
            self.venue_type.push(venue._id);
          });
        }

      	this.userSettings['inputString'] = this.single_event.address;
    	  this.userSettings = Object.assign({},this.userSettings);
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
    this.userService.postData({},'get_venues_genres').subscribe((result) => {
      this.all_genres = result.genres;
      this.all_venues = result.venues;
    },
    err => {
      this.all_genres = [];
      this.all_venues = [];
    });
  }

  autoCompleteCallback(data) {
    console.log(data.data.formatted_address)
    this.lat = data.data.geometry.location.lat;
    this.lng = data.data.geometry.location.lng;
    this.location = data.data.formatted_address;
  }

  add_venue(){
    this.is_submit = true;
    if(this.errors.indexOf(this.name) >= 0 || this.errors.indexOf(this.venue_type) >= 0 || this.errors.indexOf(this.genre_type) >= 0 || this.errors.indexOf(this.price) >= 0 || this.errors.indexOf(this.location) >= 0 || this.errors.indexOf(this.description) >= 0 ){
      return false;
    }

    const formData = new FormData();
  	if(this.is_mobile_app == 'true'){
      for (var i = 0; i < this.all_images.length; i++) {  
        if(this.errors.indexOf(this.all_images[i]['_id']) >= 0){
          formData.append('file', this.all_images[i]['blob'], this.all_images[i]['name']); 
        }
      } 
  	}
  	else{ 
  		for (var i = 0; i < this.all_images.length; i++) {  
        if(this.errors.indexOf(this.all_images[i]['_id']) >= 0){
  		    formData.append("file", this.all_images[i]);  
        }
  		}
  	}

    if(this.isEdit == '1'){
    	formData.append('id', this.event_id);
    }

    formData.append('hostId', this.hostId);
    formData.append('name', this.name);
    formData.append('venue_type', JSON.stringify(this.venue_type));
    formData.append('price', this.price);
    formData.append('address', this.location);
    formData.append('status', '0');
    formData.append('lat', this.lat);
    formData.append('lng', this.lng);
    formData.append('venue_description', this.description);
    formData.append('keywords', this.keywords);
    formData.append('genre', JSON.stringify(this.genre_type));
    formData.append('deleted_imgs', JSON.stringify(this.deleted_imgs));
    formData.append('deleted_files', JSON.stringify(this.deleted_files));
    
    this.userService.presentLoading();
    var API_ENDPOINT = this.isEdit == '1' ? 'edit_venue' : 'add_venue';
    this.userService.postData(formData, API_ENDPOINT).subscribe((result) => {
      this.userService.stopLoading();
      if(result.status == 1){
        this.is_submit = false;

	    this.name = '';
	    this.venue_type = '';
	    this.price = '';
	    this.location = '';
	    this.lat = '';
	    this.lng = '';
	    this.description = '';
	    this.genre_type = [];
	    this.imgBlob = '';
	    this.file_name = '';
	    this.keywords = '';
	    this.userSettings['inputString'] = '';
    	this.userSettings = Object.assign({},this.userSettings);
      this.deleted_imgs = [];
      this.deleted_files = [];
    	var message = '';
    	if(this.isEdit == '1'){
    		message = 'Venue updated successfully.';
    	}
    	else{
    		message = 'Venue added successfully.We will approve to publish it soon.';
    	}
        this.userService.presentToast( message,'success');
        localStorage.setItem('is_venue_open','1');
        this.router.navigate(['/host-events']);
      }
      else if(result.status == 2){
        this.userService.presentToast('Venue already exists with same name.','danger');
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

  images(){
  	this.isInvalid = false;
  	this.product_images = [];
  	var files = this.uploader.queue;
  	console.log(files)
  	var inc = files.length;
  	for(var i=1;i<=inc;i++){
  		if(this.product_images.length == 0){
  			console.log(files[i-1]._file.type)
  			if(this.allowedMimes.indexOf(files[i-1]._file.type) >= 0){
  				this.product_images.push(files[i-1]._file);
  				this.product_images[i-1]['url'] = window.URL.createObjectURL(this.product_images[i-1]);
  			}
  			else{
  				this.isInvalid = true;
  			}
  		}
  		else{
  			if(this.allowedMimes.indexOf(files[i-1]._file.type) >= 0){
  				this.product_images.push(files[i-1]._file);
  				this.product_images[this.product_images.length - 1]['url'] = window.URL.createObjectURL(this.product_images[i-1]);
  			}
  			else{
  				this.isInvalid = true;
  			}
  		}
  	}
  	if((this.all_images.length + this.product_images.length) <= 10){
  		this.all_images = this.all_images.concat(this.product_images);
  	}
  	else{
		this.userService.presentToast('You can only upload upto 10 images.','danger');
	}
  	this.uploader.queue = [];
  	console.log(this.all_images)
  }

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: "Select Image source",
      buttons: [{
            text: 'Load from Library',
            handler: () => {
                this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY,'0');
            }
        },
        {
            text: 'Use Camera',
            handler: () => {
                this.takePicture(this.camera.PictureSourceType.CAMERA,'1');
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

  takePicture(sourceType: PictureSourceType, selection_type) {
    var options: CameraOptions = {
        quality: 50,
        sourceType: sourceType,
        saveToPhotoAlbum: false,
        correctOrientation: true
    };
    if(selection_type == '0'){
      this.imagePicker.getPictures(options).then((results) => {
        for (var i = 0; i < results.length; i++) {
            this.startUpload(results[i]);
        }
      }, (err) => { console.log(err)});
    }
    else{
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
        self.all_images.push({blob : imgBlob, name : file.name, url: imgEntry});
        self.ref.detectChanges();
    };
    reader.readAsArrayBuffer(file);
  }

  delete_image(index,img){
  	this.all_images.splice(index,1);
    this.ref.detectChanges();
    if(this.errors.indexOf(img._id) == -1){
      this.deleted_imgs.push(img._id);
      this.deleted_files.push(img.file_name);
    }
    console.log(this.deleted_imgs)
  }


}
