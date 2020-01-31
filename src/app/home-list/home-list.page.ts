import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { config } from '../config';
import { ModalController, IonInfiniteScroll } from '@ionic/angular'; 
import { Router, ActivatedRoute } from '@angular/router';
import { FiltersPage } from '../filters/filters.page';
import { Geolocation } from '@ionic-native/geolocation/ngx';


@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.page.html',
  styleUrls: ['./home-list.page.scss'],
})
export class HomeListPage implements OnInit {
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
page_type:any;
search_term:any;
all_genres:any;
genres:any=[];
all_venues:any;
venues:any=[];
min_price:number=0;
max_price:number;
mile_radius:number=0;
price_limit:number = 5000;
can_hot_menu_at_top:number;
allow_city_region:number;
is_mobile_app:any = config.IS_MOBILE_APP;
  constructor(public userService: UserService, private activatedRoute: ActivatedRoute, public modalController: ModalController, private geolocation: Geolocation) { 
    this.records_per_page = 9;
    this.max_price = this.price_limit;
    this.page_type = activatedRoute.snapshot.paramMap.get('type');
    console.log(this.page_type)
    this.get_venues_genres();
  }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.scrollToTop();
  	var token = localStorage.getItem('niteowl_auth_token');
    this.userId = this.userService.decryptData(token,config.ENC_SALT);
    var niteowl_sessions = JSON.parse(localStorage.getItem('niteowl_sessions'));
    this.can_hot_menu_at_top = niteowl_sessions.can_hot_menu_at_top;
    this.allow_city_region = niteowl_sessions.allow_city_region;

    console.log('niteowl_sessions')
    console.log(niteowl_sessions)

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
      
      if(self.is_mobile_app == 'true'){
        self.geolocation.getCurrentPosition().then((resp) => {
          console.log('mobile app')
          var current_lng = resp.coords.longitude;
          var current_lat = resp.coords.latitude;
          callFn(event,type,current_lng,current_lat);
        }).catch((error) => {
          console.log('Error getting location', error);
        });
      }
      else{
        navigator.geolocation.getCurrentPosition( pos => {
          console.log('web app')
          var current_lng = pos.coords.longitude;
          var current_lat = pos.coords.latitude;
          callFn(event,type,current_lng,current_lat);
        });
      }
      function callFn(event,type,current_lng,current_lat){
        var api_endpoint = (self.page_type == 'favorites') ? 'my_favorites' : 'get_events';
        self.userService.postData({
          userId: self.userId, 
          records_per_page: self.records_per_page, 
          start: self.start, 
          search_term : self.search_term,
          genres : self.genres,
          venues : self.venues,
          min_price: self.min_price,
          max_price: self.max_price,
          mile_radius: self.mile_radius,
          can_hot_menu_at_top: self.can_hot_menu_at_top,
          allow_city_region: self.allow_city_region,
          current_lng : current_lng,
          current_lat : current_lat,
          miles : 10000

        },api_endpoint).subscribe((result) => { 
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
      }
      // });
    }, 500);
  }

  get_venues_genres(){
    this.userService.postData({},'get_venues_genres').subscribe((result) => {
      this.all_genres = result.genres;
      this.all_venues = result.venues;
      console.log(result)
    },
    err => {
      this.all_genres = [];
      this.all_venues = [];
    });
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

  async filterPage() {
    const modal = await this.modalController.create({
      component: FiltersPage,
      componentProps: { 
        filters : { 
          all_genres: this.all_genres,
          all_venues: this.all_venues,
          genres: this.genres,
          venues: this.venues,
          min_price: this.min_price,
          max_price: this.max_price,
          price_limit: this.price_limit,
          mile_radius: this.mile_radius
        }
      }
    });
    modal.onDidDismiss().then((detail) => {
      console.log('detail')
      console.log(detail)
       if(this.errors.indexOf(detail.data) == -1) {
          if(detail.data.reset == '1'){
            this.genres = [];
            this.venues = [];
            this.min_price = 0;
            this.max_price = this.price_limit;
            this.mile_radius = 0;
            this.scrollToTop();
            var self = this;
            setTimeout(function(){
              self.start = 0;
              self.is_loaded = false;
              this.is_more_records = true;
              self.all_events = [];
              self.getEvents({},'0');
            },500);
          }
          if(detail.data.applied == '1'){
            this.genres = detail.data.genres;
            this.venues = detail.data.venues;
            this.min_price = detail.data.min_price;
            this.max_price = detail.data.max_price;
            this.mile_radius = detail.data.mile_radius;
            this.scrollToTop();
            var self = this;
            setTimeout(function(){
              self.start = 0;
              self.is_loaded = false;
              this.is_more_records = true;
              self.all_events = [];
              self.getEvents({},'0');
            },500);
          }
       }
    });
    return await modal.present();
  }

  scrollToTop() {
    var self = this;
    setTimeout(function(){
      self.content.scrollToTop(300);
    },100);
  }

}
