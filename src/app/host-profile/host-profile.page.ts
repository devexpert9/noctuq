import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActionSheetController, Platform, Events } from '@ionic/angular'; 
import { UserService } from '../services/user/user.service';
import { config } from '../config';
import { Router } from '@angular/router';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { File, FileEntry } from '@ionic-native/file/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { DomSanitizer } from '@angular/platform-browser';
declare var window: any; 

@Component({
  selector: 'app-host-profile',
  templateUrl: './host-profile.page.html',
  styleUrls: ['./host-profile.page.scss'],
})
export class HostProfilePage implements OnInit {
public win: any = window;
userId:any;
errors:any=['',null,undefined,'undefined'];
profile:any;
IMAGES_URL:any=config.IMAGES_URL;
is_loaded:Boolean=false;
is_edit:Boolean=false;
is_image_selected:Boolean=false;
isInvalid:Boolean=false;
imgBlob:any;
file_name:any;
image_url:any;
is_mobile_app:any = config.IS_MOBILE_APP;
allowedMimes:any=config.IMAGE_EXTENSIONS;
  constructor(public userService: UserService, private router: Router,private camera: Camera, private file: File, private filePath: FilePath, public sanitizer:DomSanitizer, public actionSheetController: ActionSheetController, private platform: Platform,private ref: ChangeDetectorRef, private events: Events) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.is_loaded = false;
    this.is_edit = false;
  	var token = localStorage.getItem('niteowl_host_auth_token');
    this.userId = this.userService.decryptData(token,config.ENC_SALT);
    this.getProfile();
  }

  getProfile(){
    this.userService.presentLoading();
    this.userService.postData({_id : this.userId},'get_host_profile').subscribe((result) => {
      this.userService.stopLoading();
      if(this.errors.indexOf(result) == -1){
        this.is_loaded = true;
        localStorage.setItem('niteowl_host_sessions',JSON.stringify(result));
        this.profile = result;
        this.profile.phone = this.errors.indexOf(this.profile.phone) == -1 ? this.profile.phone : '';
      }
      else{
        this.userService.presentToast('Session expired, Please login again','danger');
        this.router.navigate(['/login/host']);
      }
    },
    err => {
      this.is_loaded = true;
      this.userService.stopLoading();
      this.userService.presentToast('Unable to fetch results, Please try again','danger');
    });
  }

  goEdit(){
    this.is_edit = true;
  }

  update(){
    if(this.errors.indexOf(this.profile.name) >= 0){
      this.userService.presentToast('Name is required','danger');
      return false;
    }
    if(this.errors.indexOf(this.profile.email) >= 0){
      this.userService.presentToast('Email is required','danger');
      return false;
    }
    this.userService.presentLoading();

    const formData = new FormData();
    if(this.is_image_selected){
      if(this.is_mobile_app == 'true'){
        formData.append('file', this.imgBlob, this.file_name); 
      }
      else{
        formData.append('file', this.imgBlob); 
      }
    }
    formData.append('_id', this.profile._id);
    formData.append('name', this.profile.name);
    formData.append('email', this.profile.email);
    formData.append('phone', this.profile.phone);
    formData.append('about', this.profile.about);

    this.userService.postData(formData,'update_host_profile').subscribe((result) => {
      this.userService.stopLoading();
      if(result.status == 1){
        this.is_edit = false;
        var user_sessions = JSON.parse(localStorage.getItem('niteowl_host_sessions'));
        user_sessions.name = this.profile.name;
        user_sessions.email = this.profile.email;
        if(this.is_image_selected){
          user_sessions.image = result.image;
          user_sessions.is_social_image = '0';
        }
        localStorage.setItem('niteowl_host_sessions',JSON.stringify(user_sessions));
        //this.events.publish('user_log_activity:true','');
        this.userService.presentToast('Profile updated successfully.','success');
        if(this.is_image_selected){
          this.is_image_selected = false;
          this.profile.image = result.image;
        }
      }
      else if(result.status == 2){
        this.userService.presentToast('Email already exists.','danger');
      }
      else{
        this.userService.presentToast('Error while updating profile! Please try after some time.','danger');
      }
    },
    err => {
      this.userService.stopLoading();
      this.userService.presentToast('Unable to update profile, Please try after some time.','danger');
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
      }
      else{
        self.is_image_selected = true;
        self.imgBlob = image_file;
        self.image_url = window.URL.createObjectURL(image_file);
        console.log(self.image_url)
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

  logout(){
  	localStorage.removeItem('niteowl_host_auth_token');
    localStorage.removeItem('niteowl_host_sessions');
    this.router.navigate(['/login/host']);
  }

}
