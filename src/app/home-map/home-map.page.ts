import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
// import { GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng, MarkerOptions, Marker } from "@ionic-native/google-maps/ngx";
import { Platform } from "@ionic/angular";
import { Router, ActivatedRoute } from '@angular/router';
import { config } from '../config';
import { UserService } from '../services/user/user.service';
import { ModalController } from '@ionic/angular';
import { FiltersPage } from '../filters/filters.page';
import { Geolocation } from '@ionic-native/geolocation/ngx';
declare var require:any;
var geolocationn = require('geolocation')
@Component({
  selector: 'app-home-map',
  templateUrl: './home-map.page.html',
  styleUrls: ['./home-map.page.scss'],
})
export class HomeMapPage implements OnInit {
// @ViewChild('map',{static: true}) element: ElementRef;
// map: GoogleMap;
// markerOptions: MarkerOptions;
// coordinates: LatLng;
userId:any;
page_type:any;
is_mobile_app:any = config.IS_MOBILE_APP;
all_events:any;
all_venues_list:any;
lat:number;
lng:number;
lat_v:number;
lng_v:number;
zoom:number=12;
search_term:any;
all_genres:any;
all_venues:any;
venues:any=[];
genres:any=[];
min_price:number=0;
max_price:number;
mile_radius:number=0;
errors:any=['',undefined,null,0]
price_limit:number = 5000;
view_type:string='events';
allow_city_region:any;
user_lat:any;
user_lng:any;
url:any = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
  constructor(private geolocation: Geolocation, public plt: Platform, private router: Router, public activatedRoute: ActivatedRoute, public userService: UserService, public modalController:ModalController) { 
  	this.page_type = activatedRoute.snapshot.paramMap.get('type');
    this.get_venues_genres();
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    var niteowl_sessions = JSON.parse(localStorage.getItem('niteowl_sessions'));
    this.allow_city_region = niteowl_sessions.allow_city_region;
    console.log(this.allow_city_region)
    this.getLocationSetting();


    if(localStorage.getItem('is_event_open') == '1'){
      this.view_type = 'events';
    }
    if(localStorage.getItem('is_venue_open') == '1'){
      this.view_type = 'venues';
    }
    this.search_term = '';
  	var token = localStorage.getItem('niteowl_auth_token');
    this.userId = this.userService.decryptData(token,config.ENC_SALT);

    this.initWebMap();
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

  search(){
    var self = this;
    setTimeout(function(){
      self.initWebMap();
    },1000);
  }

  clear_search(){
    var self = this;
    setTimeout(function(){
      self.initWebMap();
    },1000);
  }

  initWebMap(){

    var self = this;
    setTimeout(() => {
      
      if(self.is_mobile_app == 'true'){
        self.geolocation.getCurrentPosition().then((resp) => {
          console.log('mobile app')
          console.log(resp)
          var current_lng = resp.coords.longitude;
          var current_lat = resp.coords.latitude;
          callVenuesList(current_lng,current_lat);
        }).catch((error) => {
          console.log('Error getting location', error);
        });
      }
      else{
        // navigator.geolocation.getCurrentPosition( pos => {
          console.log('web app')
          // var current_lng = pos.coords.longitude;
          // var current_lat = pos.coords.latitude;
          var current_lng = '';
          var current_lat = '';
          callVenuesList(current_lng,current_lat);
        // });
      }
    },500);
    

    function callVenuesList(current_lng,current_lat){
    
      var api_endpoint_events = (self.page_type == 'favorites') ? 'my_favorites' : 'get_events';
      var api_endpoint_venues = (self.page_type == 'favorites') ? 'my_favorites' : 'get_venues_list';
        // get all events
        self.userService.postData({
          userId: self.userId, 
          genres : self.genres, 
          venues : self.venues, 
          search_term : self.search_term,
          min_price: self.min_price,
          max_price: self.max_price,
          mile_radius: self.mile_radius,
          current_lng : current_lng,
          current_lat :current_lat,
          miles : 10000
        },api_endpoint_events).subscribe((result) => { 
            if(result.total > 0){
              self.all_events = result.data;
              self.lat = Number(result.data[0]['cords']['coordinates'][1]);
              self.lng = Number(result.data[0]['cords']['coordinates'][0]);
            }
        });
        // get all venues
        self.userService.postData({
          userId: self.userId, 
          genres : self.genres, 
          venues : self.venues, 
          search_term : self.search_term,
          min_price: self.min_price,
          max_price: self.max_price,
          mile_radius: self.mile_radius,
          current_lng : current_lng,
          current_lat : current_lat,
          miles : 10000
        },api_endpoint_venues).subscribe((result) => { 
            if(result.total > 0){
              self.all_venues_list = result.data;
              self.lat_v = Number(result.data[0]['cords']['coordinates'][1]);
              self.lng_v = Number(result.data[0]['cords']['coordinates'][0]);
            }
        });

    }
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
 
       if(this.errors.indexOf(detail.data) == -1) {
          if(detail.data.reset == '1'){
            this.genres = [];
            this.venues = [];
            this.min_price = 0;
            this.max_price = this.price_limit;
            this.mile_radius = 0;
            // this.all_events = [];
            this.initWebMap();
          }
          if(detail.data.applied == '1'){
            this.genres = detail.data.genres;
            this.venues = detail.data.venues;
            this.min_price = detail.data.min_price;
            this.max_price = detail.data.max_price;
            this.mile_radius = detail.data.mile_radius;
            this.initWebMap();
          }
       }
    });
    return await modal.present();
  }

  changeView(type){
    this.view_type = type;
    if(type == 'events'){
      localStorage.setItem('is_event_open','1');
    }
    else{
      localStorage.setItem('is_venue_open','1');
    }
  }

 getLocationSetting(){
  console.log(this.is_mobile_app)
    if(this.errors.indexOf(this.allow_city_region)==-1){
      console.log('this.is_mobile_app',this.is_mobile_app)
     
      if(this.is_mobile_app == 'true'){
        var dis= this;
        console.log('enterrrr0')
        this.geolocation.getCurrentPosition().then((data) => {
          console.log('enter1')
          dis.user_lat = data.coords.latitude;
          dis.user_lng = data.coords.longitude;
        }).catch((error) => {
          console.log('Error getting location', error);
        });
  
      }else{
        console.log('enter3')
      
        geolocationn.getCurrentPosition(function (err, position) {
          dis.user_lat=position.coords.latitude;
          dis.user_lng=position.coords.longitude;
    
        })
  
      }

    }else{
      this.user_lat = '';
      this.user_lng = '';

    }



  }


  //  initMap() {
  //  	var self = this;
  //  	this.userService.presentLoading();
  //   this.map = GoogleMaps.create(this.element.nativeElement);

  //   this.map.one(GoogleMapsEvent.MAP_READY).then((data: any) => {

  //     var api_endpoint = (self.page_type == 'favorites') ? 'my_favorites' : 'get_events';
  //     self.userService.postData({userId: self.userId, genres : [], venues : []},api_endpoint).subscribe((result) => { 
  //     	  if(result.total > 0){
  //     	  	var counter = 0;
  //     	  	result.data.forEach(function(eve){
  //     	  		self.coordinates = new LatLng(eve.location.lat, eve.location.lng);
  //     	  		if(counter == 0){
		// 	      let position = {
		// 	        target: self.coordinates,
		// 	        zoom: 12
		// 	      };
		// 	      self.map.animateCamera(position);
  //     	  		}
  //     	  		self.markerOptions = {
		// 	        position: self.coordinates,
		// 	        // icon: "assets/img/map_marker.png",
		// 	        title: eve.venue_type+':'+eve.title,
  //             id: eve._id
		// 	        // infoClick: () => {
		// 	        //   self.router.navigate(['/clubs/'+eve._id]);
		// 	        // }
		//       	};
		// 	    self.map.addMarker(self.markerOptions).then((marker: Marker) => {
		// 	      marker.showInfoWindow();
  //           // marker.on(GoogleMapsEvent.INFO_CLICK, function() {
  //           marker.on(GoogleMapsEvent.INFO_CLICK).subscribe((res) => {
  //             console.log('res')
  //             console.log(res)
  //           });
		// 	    });
          
		// 	    counter = counter + 1;
  //     	  	});
  //     	  	self.userService.stopLoading();
  //     	  }
	      
  // 	  });

  //   })
  // }

}
