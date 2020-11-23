// Angular
import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from '../../../../../core/user/user.service';
import { Router } from '@angular/router'; 
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../../../core/reducers';
import { config } from '../../../../../config';
import * as $ from 'jquery';

@Component({
	selector: 'kt-notification',
	templateUrl: './notification.component.html',
	styleUrls: ['notification.component.scss']
})
export class NotificationComponent {

	isLoggedIn:boolean;
	userId:any;
	errors : any = ['',null,undefined,'undefined','null'];
	all_notifications:any=[];

	// Show dot on top of the icon
	@Input() dot: string;

	// Show pulse on icon
	@Input() pulse: boolean;

	@Input() pulseLight: boolean;

	// Set icon class name
	@Input() icon: string = 'flaticon2-bell-alarm-symbol';
	@Input() iconType: '' | 'success';

	// Set true to icon as SVG or false as icon class
	@Input() useSVG: boolean;

	// Set bg image path
	@Input() bgImage: string;

	// Set skin color, default to light
	@Input() skin: 'light' | 'dark' = 'light';

	@Input() type: 'brand' | 'success' = 'success';

	/**
	 * Component constructor
	 *
	 * @param sanitizer: DomSanitizer
	 */
	constructor(private store: Store<AppState>, private sanitizer: DomSanitizer,public userService: UserService, private router: Router, private cdr: ChangeDetectorRef) {
		var token = localStorage.getItem('apart_admin_auth_token');
	    this.userId = this.userService.decryptData(token,config.ENC_SALT);
		this.getAllNotifications();
	   
	}

	backGroundStyle(): string {
		if (!this.bgImage) {
			return 'none';
		}

		return 'url(' + this.bgImage + ')';
	}

	getAllNotifications(){
		this.userService.postData({},'get_admin_notifications').subscribe((result) => {
			this.all_notifications = result;
			console.log(result)
	     	this.cdr.markForCheck();
	    });
	}

	readNotis(id,type,data_params,i){
		$('#top_notis_drop').click();
		this.userService.postData({id:id},'read_notifications').subscribe((result) => {
			this.all_notifications.splice(i,1);
		});
		if(type == '21'){
			this.router.navigate(['/panel/events/vieweventfeeds/'+data_params.id]);

		}
		if(type == '22'){
		
			this.router.navigate(['/panel/events/comments/'+data_params.id]);
		}
	}

	setstore()
	 {
	  localStorage.setItem('user_type','admin');
	 }

  onLogout(){
  	console.log('here');
    this.userId = 0;
	  //	this.isLoggedIn = false;
	  	localStorage.removeItem('apart_admin_auth_token');
	    localStorage.removeItem('apart_admin_name');
	    localStorage.removeItem('apart_admin_image');
	  	localStorage.removeItem('apart_admin_phone');
	  	localStorage.removeItem('apart_admin_email');
	  	this.router.navigate(['/']);
  }
}
