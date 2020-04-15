import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { UserService } from '../services/user/user.service';
import { config } from '../config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
@ViewChild(IonInfiniteScroll,{static:true}) infiniteScroll: IonInfiniteScroll;
userId:any;
loading:any;
is_loaded:boolean=false;
IMAGES_URL:any = config.IMAGES_URL;
records_per_page:any;
start:any;
is_more_records:boolean = true;
all_notis:any;
errors:any = ['', null, undefined];
is_mobile_app:any = config.IS_MOBILE_APP;
scroll_event:any;
  constructor(public userService: UserService, private router: Router) { 
  	this.records_per_page = 10;
  }

  ngOnInit() {
  }

  ionViewDidEnter(){
  	this.start = 0;
  	this.all_notis = [];
  	this.is_loaded = false;
  	var token = localStorage.getItem('niteowl_auth_token');
    this.userId = this.userService.decryptData(token,config.ENC_SALT);
  	this.getNotifications({},'0');
  }

  getNotifications(event={},type=''){
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
      self.userService.postData({userId: self.userId, records_per_page: self.records_per_page, start: self.start},'get_user_notifications').subscribe((result) => { 
      	console.log(result)
        self.is_loaded = true;
        var loaded_records = self.start+self.records_per_page;
        if(loaded_records >= result.total){
         self.is_more_records = false;
        }
        self.all_notis = self.all_notis.concat(result.data);
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
        self.all_notis = [];
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

  loadMore(){
    this.start = this.start + this.records_per_page;
    this.getNotifications();
  }

  readNotis(id,index){
  	if(this.all_notis[index]['isRead'] == '0'){
	  	this.all_notis[index]['isRead'] = '1';
	  	this.userService.postData({id: id},'read_notifications').subscribe((result) => { 
	  		console.log('read...')
	  	});
  	}
  }

  messages(){
    this.router.navigate(['/messages']);
  }

  profile(){
    this.router.navigate(['/friends'])
  }

}
