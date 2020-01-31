import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
// import { GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng, MarkerOptions, Marker } from "@ionic-native/google-maps/ngx";
import { Platform } from "@ionic/angular";
import { Router, ActivatedRoute } from '@angular/router';
import { config } from '../config';
import { UserService } from '../services/user/user.service';

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

  constructor(public plt: Platform, private router: Router, public activatedRoute: ActivatedRoute, public userService: UserService) { 
  	this.id = activatedRoute.snapshot.paramMap.get('id');
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
        var eve = result.event;
        this.lat = Number(eve.location.lat);
        this.lng = Number(eve.location.lng);
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

}
