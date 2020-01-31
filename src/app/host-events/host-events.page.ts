import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { config } from '../config';
import { IonInfiniteScroll, AlertController } from '@ionic/angular'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-host-events',
  templateUrl: './host-events.page.html',
  styleUrls: ['./host-events.page.scss'],
})
export class HostEventsPage implements OnInit {
@ViewChild(IonInfiniteScroll, {static: true}) infiniteScroll: IonInfiniteScroll;
@ViewChild('content', {static: true}) private content: any;
userId:any;
all_events:any=[];
errors:any=['',null,undefined];
IMAGES_URL:any=config.IMAGES_URL;
records_per_page:number;
start:number;
is_more_records:boolean = true;
is_loaded:boolean = false;
scroll_event:any;
search_term:any;
  constructor(public userService: UserService, public alertController: AlertController) { 
    this.records_per_page = 9;
  }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.scrollToTop();
  	var token = localStorage.getItem('niteowl_host_auth_token');
    this.userId = this.userService.decryptData(token,config.ENC_SALT);

    var self = this;
    setTimeout(function(){
      self.start = 0;
      self.is_loaded = false;
      self.all_events = [];
      self.is_more_records = true; 
      self.getEvents({},'0');
    },500);
  }

  getEvents(event={},type=''){
    if(type == '0'){
      this.userService.presentLoading();
    }
    else{
      this.scroll_event = event;
      if(type == '1'){
        this.start = this.start + this.records_per_page;
      }
    }
    var self = this;
    setTimeout(() => {
      self.userService.postData({
        userId: self.userId, 
        records_per_page: self.records_per_page, 
        start: self.start, 
        search_term : self.search_term
      },'host_events').subscribe((result) => { 
          self.is_loaded = true;
          var loaded_records = self.start+self.records_per_page;
          if(loaded_records >= result.total){
           self.is_more_records = false;
          }
          self.all_events = self.all_events.concat(result.data);
          if(type == '0'){
            self.userService.stopLoading();
          }
          else{
            if(type == '1'){
              self.scroll_event.target.complete();
            }
          }
        },
        err => {
          self.is_more_records = false;
          self.is_loaded = true;
          // self.all_events = [];
          if(type == '0'){
            self.userService.stopLoading();
          }
          else{
            self.scroll_event.target.complete();
          }
          self.userService.presentToast('Unable to fetch results, Please try again','danger');
      });
    }, 500);
  }

  search(){
    this.is_loaded = false;
    this.all_events = [];
    this.start = 0;
    this.is_more_records = true;
    this.getEvents({},'0');
  }

  clear_search(){
    this.is_loaded = false;
    this.all_events = [];
    this.start = 0;
    this.is_more_records = true;
    this.getEvents({},'0');
  }

  scrollToTop() {
    var self = this;
    setTimeout(function(){
      self.content.scrollToTop(300);
    },100);
  }

  async deleteEvent(eventId, index) {
    const alert = await this.alertController.create({
      header: 'Are you sure you want to delete this event?',
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
            this.userService.postData({id:eventId},'delete_event').subscribe((result) => {
              this.userService.stopLoading();
              if(result.status == 1){
                this.userService.presentToast('Event deleted successfully.','success');
                this.all_events.splice(index,1);
              }
              else{
                this.userService.presentToast('Error while deleting event! Please try later','danger');
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


