import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ActionSheetController, Platform } from '@ionic/angular';
import { UserService } from '../services/user/user.service';
import { config } from '../config';
import { ActivatedRoute } from '@angular/router';
import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs/Observable';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { File, FileEntry } from '@ionic-native/file/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { DomSanitizer } from '@angular/platform-browser';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { Events } from '@ionic/angular';
declare var window: any;
@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  public win: any = window;
@ViewChild('content',{static : true}) private content: any;
userId:any;
toId:any;
chat_message:any;
chats:any=[];
chat_name:any;
chat_image:any;
chat_is_social_image:any;
errors:any = ['',null,undefined,"null"];
mySession:any;
new_message:any;
IMAGES_URL:any=config.IMAGES_URL;
is_mobile_app:any = config.IS_MOBILE_APP;
allowedMimes:any=config.IMAGE_EXTENSIONS;

  constructor(public events:Events,public userService: UserService, private activatedRoute: ActivatedRoute, private socket: Socket, private camera: Camera, private file: File, private filePath: FilePath, public sanitizer:DomSanitizer,private platform: Platform,private ref: ChangeDetectorRef, public actionSheetController: ActionSheetController, private imagePicker: ImagePicker, private photoViewer: PhotoViewer) { 
  	this.toId = activatedRoute.snapshot.paramMap.get('id');
    this.getUpdates().subscribe(new_message => {
        console.log('new_message')
        console.log(new_message)
        this.new_message = new_message;
        if(this.new_message.toId == this.userId){
          this.chats.push(this.new_message);
          this.scrollToBottom();
        }
    });
  }

  ngOnInit() {
  }

  ionViewDidEnter(){
  	this.chat_name = localStorage.getItem('chat_name');
    this.chat_image = localStorage.getItem('chat_image');
    this.chat_is_social_image = localStorage.getItem('chat_is_social_image');
  	var token = localStorage.getItem('niteowl_auth_token');
    this.userId = this.userService.decryptData(token,config.ENC_SALT);
    this.mySession = JSON.parse(localStorage.getItem('niteowl_sessions'));
  	this.getChat();
  }

  getChat(){
  	this.userService.presentLoading();
    this.userService.postData({toId : this.toId, fromId : this.userId},'get_chat').subscribe((result) => {
      console.log(result);
      this.events.publish('read_msgs','');
      this.userService.stopLoading();
      this.chats = result;
      this.scrollToBottom();
    },
    err => {
      this.userService.stopLoading();
      this.userService.presentToast('Unable to fetch chat, Please try again','danger');
    });
  }

  send(){
  	if(this.errors.indexOf(this.chat_message) == -1){
  		this.add_chat(this.chat_message);
  		this.chats.push({fromId : this.userId, toId: this.toId, message : this.chat_message, type : 'text', created_at : new Date()});
  		this.chat_message = '';
  		this.scrollToBottom();
  	}
  }

  add_chat(message){
    this.userService.postData({fromId: this.userId, toId: this.toId, message : message, type : 'text', from_name : this.mySession.name},'add_chat').subscribe((result) => { 
    	if(result.status == 1){
    		this.socket.connect();
    		this.socket.emit('send_message', {_id : result.data, fromId : this.userId, message : message, toId : this.toId, type : 'text', created_at : new Date() , user_name : this.mySession.name, user_image : this.mySession.name, is_social_image : this.mySession.is_social_image});
    	}
    },
    err => {
    	console.log(err)
    });
  }

  add_chat_image(imgBlob,file_name){
    const formData = new FormData();
    if(this.is_mobile_app == 'true'){
      formData.append('file', imgBlob, file_name); 
    }
    else{
      formData.append('file', imgBlob); 
    }
    formData.append('fromId', this.userId);
    formData.append('toId', this.toId);
    formData.append('type', 'image');
    formData.append('from_name', this.mySession.name);
    this.userService.postData(formData,'add_chat_image').subscribe((result) => { 
      if(result.status == 1){
        this.socket.connect();
        this.socket.emit('send_message', {fromId : this.userId, message : result.file_name, toId : this.toId, type : 'image', created_at : new Date(), user_name : this.mySession.name, user_image : this.mySession.name, is_social_image : this.mySession.is_social_image });
      }
    },
    err => {
      console.log(err)
    });
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

  uploadImg(event){ 
    var self = this;
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      var image_file = event.target.files[0];
      if(self.allowedMimes.indexOf(image_file.type) == -1){
        this.userService.presentToast('Please select valid image.','danger');
      }
      else{
        var imgBlob = image_file;
        var image_url = window.URL.createObjectURL(image_file);

        self.add_chat_image(imgBlob,'');
        self.chats.push({fromId : self.userId, message : image_url, toId : self.toId, type : 'image', temp_image : '2', created_at : new Date()});
        self.scrollToBottom();
        self.ref.detectChanges();
      }
    }
  }

  takePicture(sourceType: PictureSourceType,selection_type) {
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
    this.file.resolveLocalFilesystemUrl(imgEntry)
        .then(entry => {
            ( < FileEntry > entry).file(file => this.readFile(file,imgEntry))
        })
        .catch(err => {
            this.userService.presentToast('Error while reading file.','danger');
        });
  }
   
  readFile(file: any,imgEntry) {
    const reader = new FileReader();
    reader.onloadend = () => {
        const formData = new FormData();
        const imgBlob = new Blob([reader.result], {
            type: file.type
        });
        this.add_chat_image(imgBlob,file.name);
        this.chats.push({fromId : this.userId, message : imgEntry, toId : this.toId, type : 'image', temp_image : '1', created_at : new Date()});
        this.scrollToBottom();
        this.ref.detectChanges();
    };
    reader.readAsArrayBuffer(file);
  }

  scrollToBottom() {
  	var self = this;
  	setTimeout(function(){
  		self.content.scrollToBottom(300);
  	},100);
  }

  getUpdates() {
    var self = this;
    let observable = new Observable(observer => {
      self.socket.on('rec_message', (data) => {
        observer.next(data);
      });
    })
    return observable;
  }

  openImage(path){
    this.photoViewer.show(path);
  }

  delete_msg(_id,i){
    this.userService.presentLoading();
    this.userService.postData({toId: this.userId,msgId:_id },'clearSingleMsg').subscribe((result) => { 
    this.userService.stopLoading();
    var res;
    res= result;
      
        if(res.status==1){
          this.chats.splice(i,1);
          this.events.publish('read_msgs','');

        }else{


        }

    });


  }

}
