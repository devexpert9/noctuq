import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { config } from '../config';
import { IonInfiniteScroll } from '@ionic/angular'; 
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.page.html',
  styleUrls: ['./home-list.page.scss'],
})
export class HomeListPage implements OnInit {
@ViewChild(IonInfiniteScroll, {static: true}) infiniteScroll: IonInfiniteScroll;
userId:any;
all_events:any=[];
errors:any=['',null,undefined];
IMAGES_URL:any=config.IMAGES_URL;
records_per_page:number;
start:number;
is_more_records:boolean = true;
is_loaded:boolean = false;
scroll_event:any;
page_type:any;
  constructor(public userService: UserService, private activatedRoute: ActivatedRoute) { 
    this.records_per_page = 10;
    this.page_type = activatedRoute.snapshot.paramMap.get('type');
    console.log(this.page_type)
  }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.is_loaded = false;
    this.all_events = [];
    this.start = 0;
  	var token = localStorage.getItem('niteowl_auth_token');
    this.userId = this.userService.decryptData(token,config.ENC_SALT);
    this.getEvents({},'0');
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
      var api_endpoint = (self.page_type == 'favorites') ? 'my_favorites' : 'get_events';
      self.userService.postData({userId: self.userId, records_per_page: self.records_per_page, start: self.start},api_endpoint).subscribe((result) => { 
          self.is_loaded = true;
          var loaded_records = self.start+self.records_per_page;
          if(loaded_records >= result.total){
           self.is_more_records = false;
          }
          self.all_events = self.all_events.concat(result.data);
          if(type == '0'){
            this.userService.stopLoading();
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
          self.all_events = [];
          if(type == '0'){
            this.userService.stopLoading();
          }
          else{
            self.scroll_event.target.complete();
          }
          this.userService.presentToast('Unable to fetch results, Please try again','danger');
      });
    }, 500);
  }

}
