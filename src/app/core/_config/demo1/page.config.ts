export class PageConfig {
	public defaults: any = {
		dashboard: {
		     page: {title: 'Dashboard', desc: ''},
			},
			users: {
		     page: {title: 'Users', desc: ''},
			'adduser': {page: {title: 'Add User', desc: ''}},
			'edituser': {page: {title: 'Edit User', desc: ''}}
			}, 
			places: {
		         page: {title: 'Manage Place', desc: ''},
				'placetypes': {page: {title: 'Place Types', desc: ''}},
				'addplace': {page: {title: 'Add Place', desc: ''}},
				'editplace': {page: {title: 'Edit Place', desc: ''}},
				'addplacetype': {page: {title: 'Add Place Type', desc: ''}},
				'editplacetype': {page: {title: 'Edit Place Type', desc: ''}},
		    },
			events: {
		         page: {title: 'Manage Event', desc: ''},
				'eventtypes': {page: {title: 'Venue Types', desc: ''}},
				'addevent': {page: {title: 'Add Event', desc: ''}},
				'editevent': {page: {title: 'Edit Event', desc: ''}},				
				'addeventtype': {page: {title: 'Add Event Type', desc: ''}},
				'editeventtype': {page: {title: 'Edit Event Type', desc: ''}},
				'eventsliderimages': {page: {title: 'Event Slider Images', desc: ''}},
				'addslide': {page: {title: 'Add Slide', desc: ''}},
				'editslide': {page: {title: 'Edit Slide', desc: ''}},
				'venue_types': {page: {title: 'Venue Type', desc: ''}},
		        'genre_types': {page: {title: 'Genre Type', desc: ''}},
		    },	
			categories: {
			 page: {title: 'Places Categories', desc: ''},
			 'addcategory': {page: {title: 'Add Category', desc: ''}},
			 'editcategory': {page: {title: 'Edit Category', desc: ''}}
		},
			questions: {
			 page: {title: 'Questions', desc: ''},
			 'guidecategories': {page: {title: 'Guide Categories', desc: ''}},
			 'addquestions': {page: {title: 'Add Question', desc: ''}},
			 'editquestions': {page: {title: 'Edit Question', desc: ''}},
			 'addguidecategories': {page: {title: 'Add Category', desc: ''}},
			 'editguidecategories': {page: {title: 'Edit Category', desc: ''}}
		},
	  pages: {
		page: {title: 'Pages', desc: ''},
			'add-page': {page: {title: 'Add Page', desc: ''}},
			'edit-page': {page: {title: 'Edit Page', desc: ''}},
			'setweatherinfo': {page:{title: 'Set Weather Info', desc: ''}},
			'editweather': {page:{title: 'Edit Weather Info', desc: ''}},
			'translations': {page:{title: 'Translations', desc: ''}},
			'sendnotification': {page:{title: 'Send Notification', desc: ''}},
		   'magicbutton': {page:{title: 'Magic Button', desc: ''}},
		   'searchhistory': {page:{title: 'Search History', desc: ''}},
			'forgotpasswordrequest': {page:{title: 'Forgot Password Request', desc: ''}},
			'datasynclogs': {page:{title: 'Data Sync Logs', desc: ''}},
			'whattodo': {page:{title: 'What To Do', desc: ''}},
			'changepassword': {page:{title: 'Change Password', desc: ''}},
			'edittranslations': {page:{title: 'Edit Translation', desc: ''}}		
			
		},			
		builder: {
			page: {title: 'Layout Builder', desc: ''}
		},
		// header: {
			// actions: {
				// page: {title: 'Actions', desc: 'Actions example page'}
			// }
		// },
	};

	public get configs(): any {
		return this.defaults;
	}
}
