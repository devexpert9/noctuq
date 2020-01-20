import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { VideoCapturePlus, VideoCapturePlusOptions, MediaFile } from '@ionic-native/video-capture-plus/ngx';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { File, FileEntry } from '@ionic-native/file/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { UserService } from '../services/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { config } from '../config';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';

@Component({
  selector: 'app-make-live-feed',
  templateUrl: './make-live-feed.page.html',
  styleUrls: ['./make-live-feed.page.scss'],
})
export class MakeLiveFeedPage implements OnInit {
event_id:any;
file_name:any;
imgBlob:any;
userId:any;
API_URL:any=config.API_URL;

  constructor(private videoCapturePlus: VideoCapturePlus, private camera: Camera, private file: File, private filePath: FilePath,private ref: ChangeDetectorRef, public userService: UserService,private activatedRoute: ActivatedRoute, private transfer: FileTransfer, private router : Router) { 
  	this.event_id = activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
  }

  ionViewDidEnter(){
  	var token = localStorage.getItem('niteowl_auth_token');
    this.userId = this.userService.decryptData(token,config.ENC_SALT);
  }

  makeVideo(){
  	var self = this;
  	const options: VideoCapturePlusOptions = {
	   limit: 1,
	   highquality: true, 
       duration: 10
	}

	this.videoCapturePlus.captureVideo(options).then(function(mediafile: MediaFile[]){
		console.log(mediafile)
		self.upload_video(mediafile[0]);
	});
  }

  takePhoto(){
  	this.takePicture(this.camera.PictureSourceType.CAMERA);
  }

  takePicture(sourceType: PictureSourceType) {
    var options: CameraOptions = {
        quality: 50,
        sourceType: sourceType,
        saveToPhotoAlbum: false,
        correctOrientation: true
    };

    this.camera.getPicture(options).then(imagePath => {
      this.startUpload(imagePath);
    });
  } 

  startUpload(imgEntry) {
    this.file.resolveLocalFilesystemUrl(imgEntry)
        .then(entry => {
            ( < FileEntry > entry).file(file => this.readFile(file))
        })
        .catch(err => {
            this.userService.presentToast('Error while reading file.','danger');
        });
  }
   
  readFile(file: any) {
    var self = this;
    const reader = new FileReader();
    reader.onloadend = () => {
        const imgBlob = new Blob([reader.result], {
            type: file.type
        });
        console.log(file.name)

        self.imgBlob = imgBlob;
        self.file_name = file.name;
        self.add_feed();
    };
    reader.readAsArrayBuffer(file);
  }

  upload_video(file){
  	const fileTransfer: FileTransferObject = this.transfer.create();
	let options: FileUploadOptions = {
	  fileKey: 'file',
	  fileName: file.name,
	  headers: {},
	  params : {
	  	userId : this.userId,
	  	eventId : this.event_id,
	  	type : 'video',
	  }
	}
	this.userService.presentLoading();
	fileTransfer.upload(file.fullPath, this.API_URL+'/add_feed', options).then((data) => {
		this.userService.stopLoading();
		var response = JSON.parse(data.response);
		if(response.status == 1){
    		this.userService.presentToast('Feed posted.','success');
    		this.router.navigate(['/clubs/'+this.event_id]);
    	}
    	else{
    		this.userService.presentToast('Unable to post feed, Please try later.','danger');
    	}
	}, (err) => {
		this.userService.stopLoading();
	 	this.userService.presentToast('Unable to post feed, Please try later.','danger');
	});
  }

  add_feed(){
  	const formData = new FormData();
  	formData.append('file', this.imgBlob, this.file_name); 
    formData.append('userId', this.userId);
    formData.append('eventId', this.event_id);
    formData.append('type', 'image');
  	this.userService.presentLoading();
    this.userService.postData(formData,'add_feed').subscribe((result) => {
    	this.userService.stopLoading();
    	if(result.status == 1){
    		this.userService.presentToast('Feed posted.','success');
    		this.router.navigate(['/clubs/'+this.event_id]);
    	}
    	else{
    		this.userService.presentToast('Unable to post feed, Please try later.','danger');
    	}
    },
    err => {
      this.userService.stopLoading();
      this.userService.presentToast('Unable to fetch results, Please try again','danger');
    });
  }
}
