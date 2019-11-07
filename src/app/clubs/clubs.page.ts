import { Component, OnInit } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.page.html',
  styleUrls: ['./clubs.page.scss'],
})
export class ClubsPage implements OnInit {

  constructor(private socialSharing: SocialSharing) { }

  ngOnInit() {
  }
  
  share(){
	// Share via email
	this.socialSharing.share('Upscale House - Live Bands, Dancing, Food, Drinks').then(() => {
	  // Success!
	}).catch(() => {
	  // Error!
	});   
  }

}
