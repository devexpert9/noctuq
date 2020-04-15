import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
// import { GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng, MarkerOptions, Marker } from "@ionic-native/google-maps/ngx";
import { Platform } from "@ionic/angular";
import { Router, ActivatedRoute } from '@angular/router';
import { config } from '../config';
import { UserService } from '../services/user/user.service';
import { ModalController } from '@ionic/angular';
import { FiltersPage } from '../filters/filters.page';

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
errors:any=['',null,undefined];
price_limit:number = 5000;
view_type:string='events';
  constructor(public plt: Platform, private router: Router, public activatedRoute: ActivatedRoute, public userService: UserService, public modalController:ModalController) { 
  	this.page_type = activatedRoute.snapshot.paramMap.get('type');
    this.get_venues_genres();
    console.log(this.page_type)
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    if(localStorage.getItem('is_event_open') == '1'){
      this.view_type = 'events';
    }
    if(localStorage.getItem('is_venue_open') == '1'){
      this.view_type = 'venues';
    }
    this.search_term = '';
  	var token = localStorage.getItem('niteowl_auth_token');
    this.userId = this.userService.decryptData(token,config.ENC_SALT);

    // if(this.is_mobile_app == 'true'){
    //   this.plt.ready().then(() => {
    //     this.initMap();
    //   });
    // }
    // else{
      this.initWebMap();
    // }
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

    var api_endpoint_events = (this.page_type == 'favorites') ? 'my_favorites' : 'get_events';
    var api_endpoint_venues = (this.page_type == 'favorites') ? 'my_favorites' : 'get_venues_list';
      // get all events
      this.userService.postData({
        userId: this.userId, 
        genres : this.genres, 
        venues : this.venues, 
        search_term : this.search_term,
        min_price: this.min_price,
        max_price: this.max_price,
        mile_radius: this.mile_radius,
        current_lng : '',
        current_lat : '',
        miles : 10000
      },api_endpoint_events).subscribe((result) => { 
          if(result.total > 0){
            this.all_events = result.data;
            this.lat = Number(result.data[0]['cords']['coordinates'][1]);
            this.lng = Number(result.data[0]['cords']['coordinates'][0]);
          }
      });
      // get all venues
      this.userService.postData({
        userId: this.userId, 
        genres : this.genres, 
        venues : this.venues, 
        search_term : this.search_term,
        min_price: this.min_price,
        max_price: this.max_price,
        mile_radius: this.mile_radius,
        current_lng : '',
        current_lat : '',
        miles : 10000
      },api_endpoint_venues).subscribe((result) => { 
          if(result.total > 0){
            this.all_venues_list = result.data;
            this.lat_v = Number(result.data[0]['cords']['coordinates'][1]);
            this.lng_v = Number(result.data[0]['cords']['coordinates'][0]);
          }
      }); 
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
