import { Component, OnInit , ViewChild, ChangeDetectorRef } from '@angular/core';
import {MatPaginator , MatSort , MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { config } from '../../../../config';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../../../core/user/user.service';
import { Lightbox } from 'ngx-lightbox';
import { Router, ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'kt-events',
  templateUrl: './vieweventfeed.component.html',
  styleUrls: ['./vieweventfeed.component.scss']
})
export class VieweventfeedComponent{


  ngclass = 'mat-video-responsive';

  src = 'assets/NASA.mp4';
  title = 'NASA Rocket Launch';
  width = 600;
  height = 337.5;
  currentTime = 0;
  autoplay = false;
  preload = true;
  loop = false;
  quality = true;
  download = true;
  fullscreen = true;
  showFrameByFrame = false;
  keyboard = true;
  color = 'primary';
  spinner = 'spin';
  poster = 'assets/NASA.jpg';
  overlay = null;
  del_id : any = null;
  muted = false;
  closeResult: string;

  _albums: any = [];
  isLoading = true;
  del_loading = false;
  errors : any = ['',null,undefined];
  loading=false;
  IMAGES_URL:any = config.IMAGES_URL;
  id:any=null;
  showntype:any = true;
  imagePath:any ="assets/img/event-bg.jpg";
  remotevideo:any=null;
  del_index:any=null;
  modalRef:any;
  type:any;
    constructor(private _lightbox: Lightbox,public activatedRoute: ActivatedRoute,public userService: UserService, private modalService: NgbModal, private cdr: ChangeDetectorRef, private _snackBar: MatSnackBar) {
      
      this.id = activatedRoute.snapshot.paramMap.get('id');
      this.getData();
  }

 
  //open(index: number): void {
    // open lightbox
  //  this._lightbox.open(this._albums, index);
 // }
 
  //close(): void {
    // close lightbox programmatically
  //  this._lightbox.close();
  //}

  removeFlag(content,del_id,del_index) {
    this.modalRef = this.modalService.open(content);
    this.del_id = del_id;
    this.del_index = del_index;
  }

  confirm_flag_remove(){
    this.loading = true;
    this.userService.postData({id:this.del_id},'remove_flag_feeds').subscribe((result) => {
      this.loading = false;
   
      if(result.status == 1){
        this.modalRef.close();
        this.showSnackBar('Flag has been removed successfully.');
        this._albums[this.del_index]['flag_status'] = 1;
        this._albums[this.del_index]['flag'] = 0;
        this.cdr.markForCheck(); 
      }
      else{
        this.showSnackBar('Error while removing flag,Please try after some time');
      }
    },
    err => {
      this.loading = false;
      this.showSnackBar('Technical error,Please try after some time');
    });
  }

  del_initiate(content,id,ind){
    this.modalService.open(content);
    this.del_id = id;
    this.del_index = ind;
  }

  deleteConfirm(){
    this.del_loading = true;
    this.userService.postData({id: this.del_id},'delete_feed').subscribe((result) => {
      this.del_loading = false;
      this.cdr.markForCheck();
      if(result.status == 1){
        $(".close_del_popup").click();
        this._albums.splice(this.del_index,1);
        this.del_id = null;
        this.del_index = null;
        this.showSnackBar('Feed deleted.');
      }
      else{
        this.showSnackBar('Error while deleting feed.Please try later.');
      }
    },
    err => {
        this.showSnackBar('Error while deleting feed.Please try later.')
    });
  }

   
  open(content,type,thumb,src) {
    if(type=='image')
    { this.showntype=true; console.log('true');
        this.imagePath = src;
      this.modalService.open(content, {
        ariaLabelledBy: 'modal-basic-title',
        windowClass: 'app-modal-window',
        size: <any>'lg'
}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
    if(type=='video')
    { this.remotevideo=src;
      this.src=src;
      this.poster=thumb;
      this.showntype=false; console.log('false');
      this.modalService.open(content, {
        ariaLabelledBy: 'modal-basic-title', 
        windowClass: 'app-modal-window',
        size: <any>'lg'
}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
   
  }

  getData(){
   
    this.userService.postData({id: this.id},'get_event_feeds').subscribe((result) => {
     let urls:any = this.IMAGES_URL;
      result.forEach(function(element){
        const album = {
        _id: element._id,
        flag: element.flag,
        flag_status: element.flag_status,
         src: urls+'/feeds/'+element.feed_name,
         type: element.type!='image' ? 'video' : 'image',
          caption: element.type!='image' ? 'fa-video' : 'fa-image',
          thumb: (element.thumbnail!=undefined && element.thumbnail!='undefined') ? urls+'/feeds/'+element.thumbnail : "assets/img/event-bg.jpg"
          };
           this._albums.push(album);
           this.cdr.markForCheck();
        }, this);

      this.isLoading = false;
    },
    err => {
    this.isLoading = false;
    });
  }


private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  showSnackBar(message){
    this._snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }

  }