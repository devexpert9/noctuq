import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
// import { GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng, MarkerOptions, Marker } from "@ionic-native/google-maps/ngx";
import { Platform } from "@ionic/angular";
import { Router, ActivatedRoute } from '@angular/router';
import { config } from '../config';
import { UserService } from '../services/user/user.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
declare var require:any;
var geolocation = require('geolocation')
@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
// @ViewChild('map',{static: true}) element: ElementRef;
// map: GoogleMap;
// markerOptions: MarkerOptions;
// coordinates: LatLng;
userId:any;
id:any;
is_mobile_app:any = config.IS_MOBILE_APP;
url:any = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
zoom:number=12;
lat:number;
lng:number;
allow_city_region:any;
user_lat:any;
user_lng:any;
errors:any=['',undefined,null,0]
  constructor(private geolocation: Geolocation, public plt: Platform, private router: Router, public activatedRoute: ActivatedRoute, public userService: UserService) { 
    this.id = activatedRoute.snapshot.paramMap.get('id');
    this.locationDetect();
  }

  ngOnInit() {
  }

  ionViewDidEnter() {

    var niteowl_sessions = JSON.parse(localStorage.getItem('niteowl_sessions'));
    this.allow_city_region = niteowl_sessions.allow_city_region;
    this.getLocationSetting();
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

  initWebMap(){
    this.userService.postData({event_id: this.id, userId: this.userId},'get_event_details').subscribe((result) => {
     
        var eve ;
       eve = result.event;
       console.log();
        this.lat = Number(eve.cords.coordinates[1]);
        this.lng = Number(eve.cords.coordinates[0]);
    });
  }

  locationDetect(){
    var dis= this;
    geolocation.getCurrentPosition(function (err, position) {
      dis.user_lat=position.coords.latitude;
      dis.user_lng=position.coords.longitude;

    })

  }

  // initMap() {
  //  	var self = this;
  //  	this.userService.presentLoading();
  //   this.map = GoogleMaps.create(this.element.nativeElement);

  //   this.map.one(GoogleMapsEvent.MAP_READY).then((data: any) => {
  //     self.userService.postData({event_id: this.id, userId: this.userId},'get_event_details').subscribe((result) => {
  //     	  	var eve = result.event;
  //     	  	self.coordinates = new LatLng(Number(eve.location.lat), Number(eve.location.lng));
		// 	      let position = {
		// 	        target: self.coordinates,
		// 	        zoom: self.zoom
		// 	      };
		// 	      self.map.animateCamera(position);
  //     	  		self.markerOptions = {
		// 	        position: self.coordinates,
		// 	        title: eve.venue_type+':'+eve.title,
  //             		id: eve._id
		//       	};
		// 	    self.map.addMarker(self.markerOptions).then((marker: Marker) => {
		// 	      marker.showInfoWindow();
		// 	    });
  //     	  	self.userService.stopLoading(); 
  // 	  });
  //   })
  // }

  getLocationSetting(){

    if(this.errors.indexOf(this.allow_city_region)==-1 && this.allow_city_region==1){
      if(this.is_mobile_app=='true'){
        var dis= this;
        this.geolocation.getCurrentPosition().then((data) => {
          console.log('enter1')
          dis.user_lat = data.coords.latitude;
          dis.user_lng = data.coords.longitude;
        }).catch((error) => {
          console.log('Error getting location', error);
        });
  
      }else{
  
        var dis= this;
        geolocation.getCurrentPosition(function (err, position) {
          dis.user_lat=position.coords.latitude;
          dis.user_lng=position.coords.longitude;
    
        })
  
      }

    }else{
      this.user_lat = '';
      this.user_lng = '';

    }



  }

}
