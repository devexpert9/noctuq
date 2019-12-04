import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng, MarkerOptions, Marker } from "@ionic-native/google-maps/ngx";
import { Platform } from "@ionic/angular";
import { Router, ActivatedRoute } from '@angular/router';
import { config } from '../config';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-home-map',
  templateUrl: './home-map.page.html',
  styleUrls: ['./home-map.page.scss'],
})
export class HomeMapPage implements OnInit {
@ViewChild('map',{static: true}) element: ElementRef;
map: GoogleMap;
markerOptions: MarkerOptions;
coordinates: LatLng;
userId:any;
page_type:any;
  constructor(public plt: Platform, private router: Router, public activatedRoute: ActivatedRoute, public userService: UserService) { 
  	this.page_type = activatedRoute.snapshot.paramMap.get('type');
    console.log(this.page_type)
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
  	var token = localStorage.getItem('niteowl_auth_token');
    this.userId = this.userService.decryptData(token,config.ENC_SALT);
    this.plt.ready().then(() => {
      this.initMap();
    });
  }

   initMap() {
   	var self = this;
   	this.userService.presentLoading();
    this.map = GoogleMaps.create(this.element.nativeElement);

    this.map.one(GoogleMapsEvent.MAP_READY).then((data: any) => {

      var api_endpoint = (self.page_type == 'favorites') ? 'my_favorites' : 'get_events';
      self.userService.postData({userId: self.userId},api_endpoint).subscribe((result) => { 
      	  if(result.total > 0){
      	  	var counter = 0;
      	  	result.data.forEach(function(eve){
      	  		self.coordinates = new LatLng(eve.location.lat, eve.location.lng);
      	  		if(counter == 0){
			      let position = {
			        target: self.coordinates,
			        zoom: 17
			      };
			      self.map.animateCamera(position);
      	  		}
      	  		self.markerOptions = {
			        position: self.coordinates,
			        // icon: "assets/img/map_marker.png",
			        title: eve.venue_type+':'+eve.title,
			        infoClick: () => {
			          self.router.navigate(['/clubs/'+eve._id]);
			        }
		      	};
			    self.map.addMarker(self.markerOptions).then((marker: Marker) => {
			      marker.showInfoWindow();
			    });
			    counter = counter + 1;
      	  	});
      	  	self.userService.stopLoading();
      	  }
	      
  	  });

    })
  }

}
