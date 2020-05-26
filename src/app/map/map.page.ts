import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
// import { GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng, MarkerOptions, Marker } from "@ionic-native/google-maps/ngx";
import { Platform } from "@ionic/angular";
import { Router, ActivatedRoute } from '@angular/router';
import { config } from '../config';
import { UserService } from '../services/user/user.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
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
zoom:number=12;
lat:number;
lng:number;
allow_city_region:any;
user_lat:any;
user_lng:any;
errors:any=['',undefined,null,0]
  constructor(private geolocation: Geolocation,public plt: Platform, private router: Router, public activatedRoute: ActivatedRoute, public userService: UserService) { 
    this.id = activatedRoute.snapshot.paramMap.get('id');
    this.locationDetect();
    var niteowl_sessions = JSON.parse(localStorage.getItem('niteowl_sessions'));
    this.allow_city_region = niteowl_sessions.allow_city_region;

    this.getLocationSetting();



  }

  ngOnInit() {
  }

  ionViewDidEnter() {
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
            let watch = this.geolocation.watchPosition();
        watch.subscribe((data) => {
        // data can be a set of coordinates, or an error (if an error occurred).
        // data.coords.latitude
        // data.coords.longitude
        });

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
 
    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      this.user_lat=data.coords.latitude;
      this.user_lng=data.coords.longitude;
  
    });

  }

}
