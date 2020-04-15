import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ActionSheetController, Platform } from '@ionic/angular';
import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../services/user/user.service';
import { config } from '../config';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { File, FileEntry } from '@ionic-native/file/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { DomSanitizer } from '@angular/platform-browser';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
declare var window: any;

@Component({
  selector: 'app-my-chats',
  templateUrl: './my-chats.page.html',
  styleUrls: ['./my-chats.page.scss'],
})
export class MyChatsPage implements OnInit {
public win: any = window;
userId:any;
loading:any;
is_loaded:boolean=false;
all_users:any=[];
all_from_users:any=[];
all_product_ids:any=[];
errors : any = ['',null,undefined];
chat_user_id:any;
chats:any;
chat_product_id:any;
can_get_users:boolean=false;
isShow:boolean=false;
IMAGES_URL:any=config.IMAGES_URL;
chat_message:any;
chat_product_name:any;
new_message:any;
is_mobile_app:any = config.IS_MOBILE_APP;
mySession:any;
allowedMimes:any=config.IMAGE_EXTENSIONS;
chat_is_social_image:any;
chat_image:any;
  constructor(public userService: UserService, private socket: Socket,public router : Router, private camera: Camera, private file: File, private filePath: FilePath, public sanitizer:DomSanitizer,private platform: Platform,private ref: ChangeDetectorRef, public actionSheetController: ActionSheetController, private imagePicker: ImagePicker, private photoViewer: PhotoViewer) { 
	  	this.getUpdates().subscribe(new_message => {
	        console.log('new_message')
	        console.log(new_message)
	        this.new_message = new_message;
	        if(this.new_message.toId == this.userId){
	        	if(this.all_from_users.indexOf(this.new_message.fromId) == -1){
	        		this.new_message['count'] = 1;
	        		this.new_message['message_type'] = this.new_message.type;
	        		this.all_users.splice(0,0,this.new_message);
	        		this.all_from_users.splice(0,0,this.new_message.fromId);
	        	}
	        	else{
	        		if(this.chat_user_id == this.new_message.fromId){
	        			this.chats.push(this.new_message);
                		this.scrollToBottom();
	        		}
	        		else{
	        			var index = this.all_from_users.indexOf(this.new_message.fromId);
	        			this.all_users[index]['count'] = this.all_users[index]['count'] + 1;
	        			this.all_users[index]['message'] = this.new_message.message;
	        			this.all_users[index]['message_type'] = this.new_message.type;
	        		}
	        	}
	        }
	    });
  }

  ngOnInit() {
  }

  ionViewDidEnter(){
  	this.all_users = [];
  	this.all_from_users = [];
  	this.chat_product_name = '';
  	this.chat_product_id = '';
  	this.chat_user_id = '';
    this.isShow = false;
  	this.is_loaded = false;
  	var token = localStorage.getItem('niteowl_auth_token');
    this.userId = this.userService.decryptData(token,config.ENC_SALT);
    this.mySession = JSON.parse(localStorage.getItem('niteowl_sessions'));
  	this.getChatUsers();
  }

  getChatUsers(type = null){
  	this.userService.presentLoading();
    this.userService.postData({userId: this.userId},'get_chat_users').subscribe((result) => { 
      this.is_loaded = true;
      this.userService.stopLoading();
      console.log(this.all_users)
      var self = this;
      if(result.users.length > 0){
      	result.users.forEach(function(user){
      		if(self.all_from_users.indexOf(user.fromId) == -1){
      			if(user.isRead == '0' && user.toId == self.userId){
      				user.count = 1;
      			}
      			else{
      				user.count = 0;
      			}
      			self.all_from_users.push(user.fromId);
      			self.all_users.push(user);
      		}
      		else{
      			if(user.isRead == '0' && user.toId == self.userId){
      				var ind = self.all_from_users.indexOf(user.fromId);
      				self.all_users[ind]['count'] = self.all_users[ind]['count'] + 1;
      			}
      		}
      	});
      	var open_chat_box = localStorage.getItem('open_chat_box');
      	if(open_chat_box == '1'){
      		var open_chat_box_id = localStorage.getItem('open_chat_box_id');
      		localStorage.removeItem('open_chat_box');
      		localStorage.removeItem('open_chat_box_id');
      		var index;

      		if(this.all_from_users.indexOf(open_chat_box_id) == -1){
        		this.all_users.splice(0,0,{message_type : 'text', message:'Lets start the chat...', fromId : this.userId, toId : open_chat_box_id, created_at : new Date(), user_name : localStorage.getItem('chat_name'), user_image : localStorage.getItem('chat_image'), is_social_image : localStorage.getItem('chat_is_social_image')});
        		this.all_from_users.splice(0,0,open_chat_box_id);
        		index = 0;
        	} 
        	else{
        		index = this.all_from_users.indexOf(open_chat_box_id);
        	}

      		this.openChat(open_chat_box_id,index);
      	}
      	console.log(this.all_users)
      }
    },
    err => {
      this.is_loaded = true;
      this.all_users = [];
      this.userService.stopLoading();
      this.userService.presentToast('Unable to fetch results, Please try again','danger');
    });
  }

  add_chat(message){
    this.userService.postData({fromId: this.userId, toId: this.chat_user_id, message : message, type : 'text', from_name : this.mySession.name},'add_chat').subscribe((result) => { 
    	if(result.status == 1){
    		this.socket.connect();
    		this.socket.emit('send_message', {_id : result.data, fromId : this.userId, message : message, toId : this.chat_user_id, type : 'text', created_at : new Date(), user_name : this.mySession.name, user_image : this.mySession.name, is_social_image : this.mySession.is_social_image });
    	}
      	if(this.can_get_users == true){
      		this.can_get_users = false;
      		this.getChatUsers('1');
      	}
    },
    err => {
    	console.log(err)
    });
  }

  scrollToBottom() {
  	setTimeout(function(){
      $("#chat_div").animate({ scrollTop: 9999 }, 1000);
  	},100);
  }

  openChat(toId,index){
    if(this.is_mobile_app == 'true'){
		localStorage.setItem('chat_name',this.all_users[index].user_name);
	    localStorage.setItem('chat_image',this.all_users[index].user_image);
	    localStorage.setItem('chat_is_social_image',this.all_users[index].is_social_image);
    	this.router.navigate(['/chat/'+toId]);
    }
    else{
    	this.chat_image = this.all_users[index].user_image;
    	this.chat_is_social_image = this.all_users[index].is_social_image;
    	this.all_users[index]['count'] = 0;
    	this.chat_user_id = toId;
    	this.userService.presentLoading();
    	this.userService.postData({fromId: this.userId, toId: toId},'get_chat').subscribe((result) => { 
        this.chats = result;
        this.scrollToBottom();
        this.isShow = true;
        this.userService.stopLoading();
        console.log(this.chats)
      },
      err => {
      	this.chats = [];
      	this.userService.stopLoading();
      });
    }
  }

  sendMessage(){
  	if(this.errors.indexOf(this.chat_message) == -1){
  		this.add_chat(this.chat_message);
  		this.chats.push({fromId : this.userId, message : this.chat_message, toId : this.chat_user_id, type : 'text', created_at : new Date(), user_name : this.mySession.name, user_image : this.mySession.name, is_social_image : this.mySession.is_social_image});
  		this.chat_message = '';
  		this.scrollToBottom();
  	}
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
        self.chats.push({fromId : self.userId, message : image_url, toId : self.chat_user_id, type : 'image', temp_image : '2', created_at : new Date()});
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
        this.chats.push({fromId : this.userId, message : imgEntry, toId : this.chat_user_id, type : 'image', temp_image : '1', created_at : new Date()});
        this.scrollToBottom();
        this.ref.detectChanges();
    };
    reader.readAsArrayBuffer(file);
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
    formData.append('toId', this.chat_user_id);
    formData.append('type', 'image');
    formData.append('from_name', this.mySession.name);
    this.userService.postData(formData,'add_chat_image').subscribe((result) => { 
      if(result.status == 1){
        this.socket.connect();
        this.socket.emit('send_message', {fromId : this.userId, message : result.file_name, toId : this.chat_user_id, type : 'image', created_at : new Date(), user_name : this.mySession.name, user_image : this.mySession.name, is_social_image : this.mySession.is_social_image });
      }
    },
    err => {
      console.log(err)
    });
  }

  openImage(path){
    this.photoViewer.show(path);
  }

}

