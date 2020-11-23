// Angular
import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from '../../../../../core/user/user.service';
import { Router } from '@angular/router'; 
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../../../core/reducers';

@Component({
	selector: 'kt-search-dropdown',
	templateUrl: './search-dropdown.component.html',
})
export class SearchDropdownComponent implements OnInit {
	// Public properties
    searchInput:any = null;
	// Set icon class name
	@Input() icon: string = 'flaticon2-search-1';

	// Set true to icon as SVG or false as icon class
	@Input() useSVG: boolean;

	@Input() type: 'brand' | 'success' | 'warning' = 'success';

	data: any[];
	result: any[];
	loading: boolean;
	fullname = 'Admin';

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	constructor(private cdr: ChangeDetectorRef, private sanitizer: DomSanitizer,public userService: UserService, private router: Router,private store: Store<AppState>) {
		var token = localStorage.getItem('apart_admin_auth_token');
	       this.fullname = localStorage.getItem('apart_admin_name');
	   console.log('name stored');
	}

	/**
	 * On init
	 */
	ngOnInit(): void {
		
		// simulate result from API
		// type 0|1 as separator or item
		this.result = [
			{
				icon: '',
				text: 'Documents',
				type: 0
			}, {
				icon: '<i class="flaticon-interface-3 kt-font-warning">',
				text: 'Annual finance report',
				type: 1
			}, {
				icon: '<i class="flaticon-share kt-font-success"></i>',
				text: 'Company meeting schedule',
				type: 1
			}, {
				icon: '<i class="flaticon-paper-plane kt-font-info"></i>',
				text: 'Project quotations',
				type: 1
			}, {
				icon: '',
				text: 'Customers',
				type: 0
			}, {
				icon: '<img src="assets/media/users/user1.jpg" alt="">',
				text: 'Amanda Anderson',
				type: 1
			}, {
				icon: '<img src="assets/media/users/user2.jpg" alt="">',
				text: 'Kennedy Lloyd',
				type: 1
			}, {
				icon: '<img src="assets/media/users/user3.jpg" alt="">',
				text: 'Megan Weldon',
				type: 1
			}, {
				icon: '<img src="assets/media/users/user4.jpg" alt="">',
				text: 'Marc-André ter Stegen',
				type: 1
			}, {
				icon: '',
				text: 'Files',
				type: 0
			}, {
				icon: '<i class="flaticon-lifebuoy kt-font-warning"></i>',
				text: 'Revenue report',
				type: 1
			}, {
				icon: '<i class="flaticon-coins kt-font-primary"></i>',
				text: 'Anual finance report',
				type: 1
			}, {
				icon: '<i class="flaticon-calendar kt-font-danger"></i>',
				text: 'Tax calculations',
				type: 1
			}
		];
	}

	/**
	 * Search
	 * @param e: Event
	 */
	search(e) {
		this.data = null;
		if (e.target.value.length > 2) {
			this.loading = true;
			// simulate getting search result
			setTimeout(() => {
				this.data = this.result;
				this.loading = false;
				this.cdr.markForCheck();
			}, 500);
		}
	}

	onLogout(){
  	console.log('here');
   
	  //	this.isLoggedIn = false;
	  	localStorage.removeItem('apart_admin_auth_token');
	    localStorage.removeItem('apart_admin_name');
	    localStorage.removeItem('apart_admin_image');
	  	localStorage.removeItem('apart_admin_phone');
	  	localStorage.removeItem('apart_admin_email');
	  	this.router.navigate(['/']);
  }

  setstore()
	 {
	  localStorage.setItem('user_type','admin');
	 }

	/**
	 * Clear search
	 *
	 * @param e: Event
	 */
	clear(e) {
		this.data = null;
		//this.searchInput.nativeElement.value = '';
	}

	openChange() {
		//setTimeout(() => this.searchInput.nativeElement.focus());
	}
}
